import java.util.*;

public class Main {

    public static void main(String[] args) {
        List<Movie> movieList = Arrays.asList(
                new Movie(1, "Spider-Man: No Way Home", 2021, 8.2, "image1.jpg"),
                new Movie(2, "The Batman", 2022, 7.9, "image2.jpg"),
                new Movie(3, "Dune", 2021, 8.0, "image3.jpg")
        );

        MovieService service = new MovieService(movieList);

        service.mergeSort(service.getMovies());
        System.out.println("Movies after sorting by year:");
        for (Movie movie : service.getMovies()) {
            System.out.println(movie.getTitle() + " - " + movie.getYear());
        }

        System.out.println("Newest movie: " + service.findNewestOrOldest(true).getTitle());
        System.out.println("Oldest movie: " + service.findNewestOrOldest(false).getTitle());

        System.out.println("Search results for 'Batman': ");
        List<Movie> searchResults = service.searchMovies("Batman");
        for (Movie movie : searchResults) {
            System.out.println(movie.getTitle());
        }
    }
}
