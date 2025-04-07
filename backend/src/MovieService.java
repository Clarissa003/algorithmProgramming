import java.util.*;

public class MovieService {

    private ArrayList<Movie> movies;

    public MovieService(List<Movie> movies) {
        this.movies = new ArrayList<>(movies);
    }

    public void mergeSort(List<Movie> list) {
        if (list.size() <= 1) return;

        int mid = list.size() / 2;
        List<Movie> left = new ArrayList<>(list.subList(0, mid));
        List<Movie> right = new ArrayList<>(list.subList(mid, list.size()));

        mergeSort(left);
        mergeSort(right);
        merge(list, left, right);
    }

    private void merge(List<Movie> list, List<Movie> left, List<Movie> right) {
        int i = 0, j = 0, k = 0;

        while (i < left.size() && j < right.size()) {
            if (left.get(i).getYear() <= right.get(j).getYear()) {
                list.set(k++, left.get(i++));
            } else {
                list.set(k++, right.get(j++));
            }
        }

        while (i < left.size()) {
            list.set(k++, left.get(i++));
        }

        while (j < right.size()) {
            list.set(k++, right.get(j++));
        }
    }
    public Movie findNewestOrOldest(boolean newest) {
        PriorityQueue<Movie> heap = new PriorityQueue<>(new Comparator<Movie>() {
            @Override
            public int compare(Movie m1, Movie m2) {
                return newest ? Integer.compare(m2.getYear(), m1.getYear()) : Integer.compare(m1.getYear(), m2.getYear());
            }
        });

        for (Movie movie : movies) {
            heap.offer(movie);
        }

        return heap.poll();
    }

    public List<Movie> filterByYear(String filter) {
        if (filter.equals("newest")) {
            Movie newest = findNewestOrOldest(true);
            return Collections.singletonList(newest);
        } else if (filter.equals("oldest")) {
            Movie oldest = findNewestOrOldest(false);
            return Collections.singletonList(oldest);
        }
        return new ArrayList<>();
    }

    public List<Movie> searchMovies(String query) {
        List<Movie> result = new ArrayList<>();
        for (Movie movie : movies) {
            if (movie.getTitle().toLowerCase().contains(query.toLowerCase())) {
                result.add(movie);
            }
        }
        return result;
    }

    public void sortByRating() {
        movies.sort(Comparator.comparingDouble(Movie::getRating).reversed());
    }

    public List<Movie> getMovies() {
        return movies;
    }
}
