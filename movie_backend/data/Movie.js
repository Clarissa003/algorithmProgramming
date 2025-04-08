class Movie {
    constructor(title, year, rating, image = "") {
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.image = image;
    }

    // Comparison methods for each field
    compareTitle(other) {
        return this.title.localeCompare(other.title);
    }

    compareYear(other) {
        return this.year - other.year;
    }

    compareRating(other) {
        return this.rating - other.rating;
    }

    // Generic comparison method
    compareTo(other, field) {
        switch(field) {
            case 'title': return this.compareTitle(other);
            case 'year': return this.compareYear(other);
            case 'rating': return this.compareRating(other);
            default: return 0;
        }
    }
}

export default Movie;