class Movie {
    constructor(title, year, rating, image = "") {
        this.title = title;  
        this.year = year;
        this.rating = rating;
        this.image = image;
    }

    // Getters
    get title() {
        return this._title;
    }

    get year() {
        return this._year;
    }

    get rating() {
        return this._rating;
    }

    get image() {
        return this._image;
    }

    // Setters
    set title(newTitle) {
        this._title = newTitle;
    }

    set year(newYear) {
        this._year = newYear;
    }

    set rating(newRating) {
        this._rating = newRating;
    }

    set image(newImage) {
        this._image = newImage;
    }

    compareTitle(other) {
        return this.title.localeCompare(other.title);
    }

    compareYear(other) {
        return this.year - other.year;
    }

    compareRating(other) {
        return this.rating - other.rating;
    }

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
