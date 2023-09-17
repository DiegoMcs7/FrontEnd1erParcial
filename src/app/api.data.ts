import { InMemoryDbService } from 'angular-in-memory-web-api';
export class DataExample implements InMemoryDbService {
  createDb() {
    const categorias = [
      { idCategorias: 1, description: 'una categoria guardada'}
     ];
    return {categorias};
}
}
