export const getPopularGames = () => {
  return fetch('https://www.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=SB1VGnDv7M')
    .then(response => {
      if(!response.ok) {
        throw Error('Error fetching popular books')
      }
      return response.json()
    })
}