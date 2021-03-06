import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateGame } from '../../actions';
import { Link } from 'react-router-dom';

export class CardDetails extends Component {
  constructor() {
    super();
    this.state = {
      house_rules: ""
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const { updateGame } = this.props;
    e.preventDefault();
    const updatedGame = {
      ...this.props,
      house_rules: this.state.house_rules
    }
    updateGame(updatedGame)
  }

  render() {
  const { id, name, year_published, min_players, max_players, min_playtime, max_playtime, description_preview, image_url, primary_publisher, categoriesIds, rules_url, categoriesKey, house_rules, ownedGames } = this.props;
  const displayCategories = categoriesIds.map(category => category.id).reduce((acc, id) => {
      categoriesKey.forEach(key => {
        if (id === key.id) {
          acc.push(key.name)
        }
      })
      return acc;
    }, []).map(categoryName => <li key={categoryName} className="card-info">{categoryName}</li>); 
  const checkOwned = ownedGames.map(game => game.id).includes(id)
  const categoriesCheck = !!categoriesIds.length;
  return (
    <section className="card-details">
      <Link to='/' className='back-btn'><button className='back-btn'>Return to Games</button></Link>
      {checkOwned && <form className="edit-card">
        <input
          type="text"
          className="edit-input"
          placeholder="Add house rules"
          name="house_rules"
          value={this.state.house_rules}
          onChange={this.handleChange}/>
        <Link to={`/card/${id}`} ><button
        className="edit-btn" 
        onClick={this.handleSubmit}>Add Changes</button></Link>
      </form>}
      { image_url && <img 
      className="details-img"
      src={image_url} 
      alt={name} /> }
      {name && <h3 className="card-descrip card-detail-name">{name}</h3>}
      { year_published && <p className="card-descrip">Year Published: <span className="card-info">{year_published}</span></p> }
      { min_players && <p className="card-descrip">Min Players: <span className="card-info">{min_players}</span></p> }
      { max_players && <p className="card-descrip">Max Players: <span className="card-info">{max_players}</span></p> }
      { min_playtime && <p className="card-descrip">Min Playtime: <span className="card-info">{min_playtime}</span></p> }
      { max_playtime && <p className="card-descrip">Max Playtime: <span className="card-info">{max_playtime}</span></p> }
      {description_preview && <p className="card-descrip"><span className="card-info">{description_preview}</span></p> }
      {primary_publisher && <p className="card-descrip">Primary Publisher: <span className="card-info">{primary_publisher}</span></p>}
      { categoriesCheck &&<p className="card-descrip">Categories:</p>}
      <ul>
        {displayCategories}
      </ul>
      {rules_url && <a className="card-descrip" href={rules_url}>Link to Rules</a> }
      {house_rules && <p className="card-descrip">House Rules: <span className="card-info">{house_rules}</span> </p> }
    </section>
  )
  }
}

export const mapStateToProps = state => ({
  categoriesKey: state.categories,
  ownedGames: state.ownedGames
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({ updateGame }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);