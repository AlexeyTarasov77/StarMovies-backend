import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";

async function seedDatabase() {
    try {
        console.log("Seeding database...");

        // Создаем страны
        const countries = await Promise.all(
            Array.from({ length: 10 }).map(() =>
                prisma.country.create({
                    data: {
                        name: faker.location.country(),
                    },
                }),
            ),
        );

        // Создаем жанры
        const genres = await Promise.all(
            ["Action", "Drama", "Comedy", "Thriller", "Horror"].map((genre) =>
                prisma.genre.create({
                    data: {
                        name: genre,
                        description: faker.lorem.paragraph(),
                    },
                }),
            ),
        );

        // Создаем актеров
        const actors = await Promise.all(
            Array.from({ length: 50 }).map(() => {
                const country = faker.helpers.arrayElement(countries);
                return prisma.actor.create({
                    data: {
                        firstName: faker.person.firstName(),
                        lastName: faker.person.lastName(),
                        bio: faker.lorem.paragraph(),
                        photoUrl: faker.image.avatar(),
                        bornDate: faker.date.past({
                            years: 50,
                            refDate: new Date("2000-01-01"),
                        }),
                        deathDate: faker.datatype.boolean()
                            ? faker.date.past({
                                  years: 20,
                                  refDate: new Date("2020-01-01"),
                              })
                            : null,
                        countryId: country.id,
                    },
                });
            }),
        );

        // Создаем фильмы
        const movies = await Promise.all(
            Array.from({ length: 20 }).map(() => {
                const country = faker.helpers.arrayElement(countries);
                const movieGenres = faker.helpers.arrayElements(genres, 2);
                const movieActors = faker.helpers.arrayElements(actors, 5);

                return prisma.movie.create({
                    data: {
                        name: faker.company.catchPhrase(),
                        synopsis: faker.lorem.sentences(),
                        releaseDate: faker.date.past({ years: 30 }),
                        runtime: faker.number.int({ min: 80, max: 180 }),
                        minAge: faker.number.int({ min: 0, max: 18 }),
                        // rating: faker.number.int({ min: 1, max: 10 }),
                        coverUrl: faker.image.url(),
                        countryOfOriginId: country.id,
                        genres: {
                            connect: movieGenres.map((genre) => ({
                                id: genre.id,
                            })),
                        },
                        actors: {
                            connect: movieActors.map((actor) => ({
                                id: actor.id,
                            })),
                        },
                    },
                });
            }),
        );

        // Создаем пользователей
        const users = await Promise.all(
            Array.from({ length: 50 }).map(() =>
                prisma.user.create({
                    data: {
                        username: faker.internet.username(),
                        email: faker.internet.email(),
                        avatarUrl: faker.image.avatar(),
                        password: faker.internet.password(),
                    },
                }),
            ),
        );

        // Создаем отзывы
        await Promise.all(
            Array.from({ length: 30 }).map(() => {
                const movie = faker.helpers.arrayElement(movies);
                const user = faker.helpers.arrayElement(users);

                return prisma.review.create({
                    data: {
                        rating: faker.number.int({ min: 1, max: 10 }),
                        comment: faker.lorem.sentence(),
                        movieId: movie.id,
                        userId: user.id,
                    },
                });
            }),
        );

        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();
