import axios from 'axios'
import { load } from 'cheerio'

class MoviesScraper {
  async scrapeData (link, selector, limit) {
    try {
      const response = await axios.get(link)
      const $ = load(response.data)
      const elements = $(selector).slice(0, limit)
      // Get text of each element in the elements array and stores it in the data array.
      const data = elements.map((_index, element) => $(element).text()).get()
      return data
    } catch (error) {
      console.error(`Cannot scrape data from ${link}:`, error)
      throw error
    }
  }

  async scrapeTitles (urls, limit) {
    try {
      const titlePromises = urls.map((url) =>
        this.scrapeData(url, 'h2', limit)
      )
      const titles = await Promise.all(titlePromises)
      return titles.filter(Boolean)
    } catch (error) {
      console.error('Cannot scrape movies titles:', error)
      throw error
    }
  }

  async scrapeRatings (urls, limit) {
    try {
      const ratingPromises = urls.map((url) =>
        this.scrapeData(url, '.rankingType__rate--value', limit)
      )
      const ratings = await Promise.all(ratingPromises)
      return ratings.filter(Boolean)
    } catch (error) {
      console.error('Cannot scrape movies ratings:', error)
      throw error
    }
  }
}

export default MoviesScraper
