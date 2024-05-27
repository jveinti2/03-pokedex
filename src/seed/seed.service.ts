import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/pake-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter, //Patron adaptador para inyectar la dependencia de petiociones http que puede seer reemplazaado por otro adaptador sin afectar el servicio siempre y cuando este adaptador implemente la interfaz HttpAdapter
  ) {}

  async executeSeed() {
    this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=50',
    );

    const data_form = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      data_form.push({
        name,
        no,
      });
    });

    this.pokemonModel.insertMany(data_form);

    return data_form;
  }
}
