import MoviesScraper from './moviesScraper.js'

async function runPerformanceTest () {
  const iterations = 10 // Number of times to run the test
  const urls = ['https://www.filmweb.pl/ranking/vod/netflix/film/2023', 'https://www.filmweb.pl/ranking/vod/hbo_max/film/2023', 'https://www.filmweb.pl/ranking/vod/canal_plus_manual/film/2023', 'https://www.filmweb.pl/ranking/vod/disney/film/2023'] // Example URLs to scrape

  const moviesScraper = new MoviesScraper()
  const durations = [] // Array to store individual test durations

  for (let i = 0; i < iterations; i++) {
    console.log(`Iteration ${i + 1}:`)

    console.time('Total Time')
    const startTime = performance.now()

    console.log('Scraping Titles:')
    const titles = await moviesScraper.scrapeTitles(urls, 10) // Change the limit or URLs as needed
    console.log(titles)

    console.log('Scraping Ratings:')
    const ratings = await moviesScraper.scrapeRatings(urls, 10) // Change the limit or URLs as needed
    console.log(ratings)

    const endTime = performance.now()
    console.timeEnd('Total Time')
    const duration = endTime - startTime
    durations.push(duration)

    console.log('------------------------')
  }

  const totalDuration = durations.reduce((sum, duration) => sum + duration, 0)
  const averageDuration = totalDuration / iterations

  console.log(`Average Speed: ${averageDuration.toFixed(2)}ms`)
}

runPerformanceTest()
