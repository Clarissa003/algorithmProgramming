public class Movie {
    private int id;
    private String title;
    private int year;
    private double rating;
    private String image;

    // Constructor
    public Movie(int id, String title, int year, double rating, String image) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.image = image;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getYear() {
        return year;
    }

    public double getRating() {
        return rating;
    }

    public String getImage() {
        return image;
    }
}
