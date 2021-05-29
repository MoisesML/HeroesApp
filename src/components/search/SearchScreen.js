import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router'
import { useForm } from '../../hooks/useForm'
import HeroCard from '../heroes/HeroCard'
import { getHeroesByName } from '../../selectors/getHeroesByName'

export default function SearchScreen({ history }) {

  const { q = '' } = queryString.parse( useLocation().search )

  const heroesFiltered = useMemo(() => getHeroesByName ( q ), [ q ])

  const [ { query }, handleInputChange ] = useForm({ query: q })

  const handleSearch = ( e ) => {
    e.preventDefault()
    history.push(`?q=${ query }`)
  }

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className='row' >
        <div className='col-5'>
          <h4>Search Form</h4>
          <hr />

          <form>
            <input
              name='query'
              type='text'
              placeholder='Find your hero'
              className='form-control'
              autoComplete='off'
              value={ query }
              onChange={ handleInputChange }
            />

            <button
              onClick={ handleSearch }
              className='btn mt-2 btn-block btn-outline-primary'
            >
              Search...
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          {
            q === '' &&
            <div className='alert alert-info'>
              Find your favorite hero
            </div>
          }

          {
            ( q !== '' && heroesFiltered.length === 0 ) &&
            <div className='alert alert-danger'>
              There is no a hero with '{ q }'
            </div>
          }
          
          {
            heroesFiltered.map( hero => (
              <HeroCard
                key={ hero.id }
                { ...hero }
              />
            ) )
          }

        </div>
      </div>
    </div>
  )
}
