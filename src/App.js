import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositoryes] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositoryes(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'OmniStack-BeTheHero',
      url: 'https://github.com/RBritoX/OmniStack-BeTheHero',
      techs: ["NodeJs", "ReactJs", "React Native"],
    })

    setRepositoryes([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositoryes(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
