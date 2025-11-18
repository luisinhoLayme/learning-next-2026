import { cacheLife } from 'next/cache'
import qs from 'qs'

export const BASE_URL = 'http://localhost:1337'

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"]
            },
            link: {
              populate: true
            }
          }
        }
      }
    }
  }
}

export const getHomePage = async () => {
  'use cache'

  // cacheLife({ expire: 60 })

  const query = qs.stringify(QUERY_HOME_PAGE)
  const response = await getStrapiData(`/api/home-page?${ query }`)
  return response?.data
}

export const getStrapiData = async (url: string) => {
  console.log('get strapi data')
  try {
    const response = await fetch(`${BASE_URL}${url}`)
    if (!response.ok) {
      throw new Error(`HTTP error: status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.log('Error fetching data: ', err)
    return null
  }
}

export const registerUserService = async (userData: object) => {
  const url = `${BASE_URL}/api/auth/local/register`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log('Error REgistering user: ', err)
    throw err
  }
}


export const loginUserService = async (userData: object) => {
  const url = `${BASE_URL}/api/auth/local/register`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log('Error REgistering user: ', err)
    throw err
  }
}
