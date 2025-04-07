public class Movie implements Comparable<Movie> {
    private int id;
    private String title;
    private int year;
    private double rating;
    private String image;
    private String description;


    public Movie(int id, String title, int year, double rating, String image, String description) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.image = image;
        this.description = description;
    }

    @Override
    public int compareTo(Movie other) {
        return Integer.compare(this.year, other.year);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}