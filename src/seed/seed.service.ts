import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

interface insertInterface {
  pokeNumber: number;
  name: string;
}

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){}

  async executeSeed() {
    await this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonInsertMany: insertInterface[] = [];

    data.results.forEach( async ({ name, url }) => {
      const segments = url.split('/');
      const pokeNumber = Number(segments[segments.length - 2]);
      pokemonInsertMany.push({pokeNumber, name});
    });

    await this.pokemonModel.insertMany(pokemonInsertMany);
    return 'Seed executed';
  }

}
