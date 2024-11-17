export default class News {
    _id;
    title;
    date;
    imageURL;
    newsURL;

    constructor(news) {
        this._id = news._id;
        this.title = news.title;
        this.date = news.date || new Date();
        this.imageURL = news.imageURL || '';
        this.newsURL = news.newsURL || '';
    }
}
