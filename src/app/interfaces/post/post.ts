import { Commentaire } from "../commentaire/commentaire";
import { Like } from "../like/like";

export interface Post {
    ID_POST?:number,
    EMAIL_UTILISATEUR:string,
    NOM_PROFIL:string,
    TEXT:string,
    IMAGE_URL:string,
    COUNT_COMMENT:number,
    COUNT_LIKE:number,
    DATE_POST:Date,
    PHOTO_DE_PROFIL:string,
    LIKES:Array<Like>,
    COMMENTAIRES:Array<any>,
    USER_LIKE:string
    
}
