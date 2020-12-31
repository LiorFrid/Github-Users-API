export default class User {
    constructor(id, email, name, avatar, description) {
        this.id = id;
        this.name = name ? name : 'None';
        this.email = email ? email : 'None';
        this.avatar = avatar ? avatar : 'None';
        this.description = description ? description : 'None';
    }
}