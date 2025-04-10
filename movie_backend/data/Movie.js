class Movie {
    constructor(title, year, rating, image = "") {
        this.title = title;  
        this.year = year;
        this.rating = rating;
        this.image = image;
    }

    //getters&setters

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

    //compare titles
    compareTitle(other) {
        return this.title.localeCompare(other.title);
    }

    //compare year
    compareYear(other) {
        return this.year - other.year;
    }

    //compare ratings
    compareRating(other) {
        return this.rating - other.rating;
    }

    //compare based on field
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
