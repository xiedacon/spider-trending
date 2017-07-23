'use strict'

const cheerio = require('cheerio')

module.exports = {
  getRepos: (text) => {
    let $ = cheerio.load(text)
    let repos = $('div.explore-content ol.repo-list li')

    return repos.toArray().map((ele) => {
      ele = $(ele)

      let [author, repoName] = (/<span class="text-normal">(.*) \/ <\/span>(.*)/g.exec($(ele.find('a')[0]).html()) || [])
        .slice(1, 3)
      let content = ele.find('p').html() || ''
      let [programmingLanguage, starTotal, fork, starIncrease] = ((ele) => {
        return [
          ele.find('span[itemprop="programmingLanguage"]').html() || '',
          ele.find(`a[href="/${author}/${repoName}/stargazers"]`).text() || '',
          ele.find(`a[href="/${author}/${repoName}/network"]`).text() || '',
          (/(\d+) stars today/g.exec((ele.text() || '').trim()) || ['', '0'])[1]
        ]
      })(ele.find('div.f6.text-gray.mt-2'))

      return {
        author: author.trim(),
        repoName: repoName.trim(),
        content: content.trim(),
        programmingLanguage: programmingLanguage.trim(),
        starTotal: starTotal.trim(),
        fork: fork.trim(),
        starIncrease: starIncrease.trim()
      }
    })
  },
  getLanguages: (text) => {
    let $ = cheerio.load(text)
    let languages = $('ul.filter-list.small a')

    return languages.toArray().map((language) => {
      return {
        name: $(language).text().trim(),
        href: $(language).attr('href')
      }
    })
  }
}
