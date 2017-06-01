'use strict'

const cheerio = require('cheerio')

module.exports = {
  getRepos: (text) => {
    let $ = cheerio.load(text)
    let repos = $('div.explore-content ol.repo-list li')

    return repos.toArray().map((ele) => {
      ele = $(ele)

      try {
        let [author, repoName] = /<span class="text-normal">(.*) \/ <\/span>(.*)/g.exec($(ele.find('a')[0]).html())
          .slice(1, 3)
          .map((str) => {
            return str.trim()
          })
        let content = (ele.find('p').html() || '').trim()
        let [programmingLanguage, starTotal, fork, starIncrease] = ((ele) => {
          return [
            (ele.find('span[itemprop="programmingLanguage"]').html() || '').trim(),
            ele.find(`a[href="/${author}/${repoName}/stargazers"]`).text().trim(),
            ele.find(`a[href="/${author}/${repoName}/network"]`).text().trim(),
            (/^(\d+).*/g.exec((ele.find('span[class="float-right"]').text() || '').trim()) || [])[1]
          ]
        })(ele.find('div.f6.text-gray.mt-2'))

        return {
          author: author,
          repoName: repoName,
          content: content,
          programmingLanguage: programmingLanguage,
          starTotal: starTotal,
          fork: fork,
          starIncrease: starIncrease
        }
      } catch (error) {
        console.error('ParseError: ' + error.stack)
        console.error('can not parse: ')
        console.error(ele.html())
      }
    })
  },
  getLanguages: (text) => {
    let $ = cheerio.load(text)
    let languages = $('ul.filter-list.small.language-filter-list a')

    return languages.toArray().map((language) => {
      return {
        name: $(language).text().trim(),
        href: $(language).attr('href')
      }
    })
  }
}
