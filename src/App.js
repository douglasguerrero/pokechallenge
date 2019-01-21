import React, { Component } from 'react';
import './App.css';
import { Dimmer, Loader, Header, Image, Modal, Button, Table } from 'semantic-ui-react';
import { fetchAllPokemon, fetchPokemonDetail } from './lib/APIUtils';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            pokemonList: {},
            pokemonDetail: {},
            pokemonImage: '',
            pokemonTypes: [],
            isLoading: false,
            showModal: false,
        };
      };
    
      componentDidMount() {
          this.getPokemonList();
      };

      async getPokemonList(){
        this.setState({ isLoading: true });

        try {
            const pokemonList = await fetchAllPokemon();
            this.setState({ pokemonList: pokemonList.results });
            this.setState({ isLoading: false });
        } catch (err) {
            this.setState({ isLoading: false })
        }
      }

      async fetchPokemonDetail(pokemonDetailUrl){
        this.setState({ isLoading: true });

        try {
            const pokemonDetail = await fetchPokemonDetail(pokemonDetailUrl);
            this.setState({ pokemonDetail});
            this.setState({ pokemonImage: pokemonDetail.sprites.front_default });
            this.setState({ pokemonTypes: pokemonDetail.types });
            this.setState({ showModal: true });
            this.setState({ isLoading: false });
        } catch (err) {
            this.setState({ isLoading: false })
        }
      };

      generatePokemonTable = () => {
        if (this.state.pokemonList.length > 0) {
            let rowNumer = 0;
          return this.state.pokemonList.map((pokemon) =>
            <Table.Row key={pokemon.name}>
                <Table.Cell>{++rowNumer}</Table.Cell>
                <Table.Cell >{pokemon.name}</Table.Cell>
                <Table.Cell ><Button color="blue" onClick={() => this.fetchPokemonDetail(pokemon.url)}>Details</Button></Table.Cell>
            </Table.Row>
          );
        }
        return null;
      };

      onModalClose = () => {
        this.setState({ showModal: false })
      };

    render () {
        const pokemonTable = this.generatePokemonTable()
        return (
        	<div>
                <Dimmer active={this.state.isLoading} inverted>
          <Loader />
        </Dimmer>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Pokemon name</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    { pokemonTable }
                    </Table.Body>
                </Table>

                <Modal size='tiny' open={this.state.showModal}>
                    <Modal.Header>Pokemon detail</Modal.Header>
                    <Modal.Content image>
                    <Image size='medium' src={this.state.pokemonImage} />
                    <Modal.Description>
                        <Header>{this.state.pokemonName}</Header>
                        <p>Weight: {this.state.pokemonDetail.weight}</p>
                        <p>Height: {this.state.pokemonDetail.height}</p>
                        <p>Types: {this.state.pokemonTypes.map((type) =>
                            `${type.type.name} `
                        )}</p>
                    <Button color="blue" onClick={() => this.onModalClose()}>Close</Button>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default App;
