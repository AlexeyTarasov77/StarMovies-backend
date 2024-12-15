import { MoviesService } from "./services"


export class MoviesHandlers {
    constructor(public service: MoviesService) {
        this.service = service
    }
}