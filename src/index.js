import MoviesScraper from './moviesScraper.js'
import saveCSV from './saveCSV.js'

const urlNetflix = 'https://www.filmweb.pl/ranking/vod/netflix/film/2023'
const urlHBOmax = 'https://www.filmweb.pl/ranking/vod/hbo_max/film/2023'
const urlCanalPlus = 'https://www.filmweb.pl/ranking/vod/canal_plus_manual/film/2023'
const urlDisneyPlus = 'https://www.filmweb.pl/ranking/vod/disney/film/2023'

const urls = [urlNetflix, urlHBOmax, urlCanalPlus, urlDisneyPlus]
const vodServices = ['Netflix', 'HBO Max', 'Canal Plus', 'Disney Plus']
const moviesScraper = new MoviesScraper();

(async () => {
  const [titles, ratings] = await Promise.allSettled([
    moviesScraper.scrapeTitles(urls, 10),
    moviesScraper.scrapeRatings(urls, 10)
  ]).then((results) => {
    return results.filter(Boolean).map((result) => result.value)
  })

  const movies = []
  for (let i = 0; i < titles.length; i++) {
    const titleList = titles[i]
    const ratingList = ratings[i]
    const vodService = vodServices[i]

    for (let j = 0; j < titleList.length; j++) {
      const title = titleList[j]
      const rating = ratingList[j]
      if (rating !== undefined) {
        movies.push({
          title,
          vodService,
          rating
        })
      }
    }
  }

  movies.sort((a, b) => b.rating - a.rating)

  const fileName = '../csv/movies.csv'
  await saveCSV(movies, fileName)
})()
