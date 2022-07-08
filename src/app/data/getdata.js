


let express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const app = express();
app.use(cors());
app.use(bodyParser.json());

let http=require('http');
let server=http.Server(app);
let socketIO=require('socket.io');
let io=socketIO(server);

const port=process.env.PORT || 3000;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;



let connection;
let id;

async function run() {
	try {
		connection = await oracledb.getConnection({
			user: "pfe",
			password: "123",
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST =localhost)(PORT = 1521))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = XE)))"
		})
		
		console.log("Connected .....")
		return connection;


	} catch (err) {
		console.error(err);
	}
}

run();



async function getTables(table,tableid1,rule1,tableid2,rule2) {
	
	let sqlReq;
	if (rule1 == null && tableid1 == null && rule2 == null && tableid2 == null) {
		sqlReq = "SELECT * FROM "+table;
	} else if (rule2 == null && tableid2 == null){
		sqlReq = "SELECT * FROM "+table+" where "+tableid1+"='" + rule1 + "'";
	}else{
		sqlReq = "SELECT * FROM "+table+" where "+tableid1+"='" + rule1 + "' and "+tableid2+"='" + rule2 + "'";
	}
	const result = await connection.execute(sqlReq);
	return result;
}


async function getProfilByList(values) {
	let list=values.split(",");
	let lastValues="";
	if(list.length==1){
		lastValues="'"+list[0]+"'";
	}else{
		for(let i=0; i<list.length; i++) {
			lastValues="'"+list[0]+"',";
		}
		lastValues.slice(0,-1)
	}
	
	let sqlReq;
	sqlReq = "SELECT * FROM profil where email in ("+lastValues+")";
	const result = await connection.execute(sqlReq);
	return result;
}



async function getPostsOrderByDate(email) {	
	sqlReq = "SELECT * FROM post where email_utilisateur='"+email+"' order by date_post DESC";
	const result = await connection.execute(sqlReq);
	return result;
}


        /////////       GET ALL DATA

		app.get('/UTILISATEUR', async function (req, res) {
            console.log("get UTILISATEUR");
            const resultat = (await getTables("UTILISATEUR",null,null,null,null)).rows;
            if (resultat.length > 0) {
                res.send({
                    message: "ALL UTILISATEUR data",
                    data: resultat
                });
            } else {
                res.send({
                    message: "UTILISATEUR data not found",
                });
            }
        })

        app.get('/profil', async function (req, res) {
            console.log("get profil hgh");
            const resultat = (await getTables("profil",null,null,null,null)).rows;
            if (resultat.length > 0) {
                res.send({
                    message: "ALL profil data",
                    data: resultat
                });
            } else {
                res.send({
                    message: "profil data not found",
                });
            }
        })
        
        app.get('/post', async function (req, res) {
            console.log("get post");
            const resultat = (await getTables("post",null,null,null,null)).rows;
            if (resultat.length > 0) {
                res.send({
                    message: "ALL post data",
                    data: resultat
                });
            } else {
                res.send({
                    message: "post data not found",
                });
            }
        })
        
        app.get('/likes', async function (req, res) {
            console.log("get likes");
            const resultat = (await getTables("likes",null,null,null,null)).rows;
            if (resultat.length > 0) {
                res.send({
                    message: "ALL likes data",
                    data: resultat
                });
            } else {
                res.send({
                    message: "likes data not found",
                });
            }
        })
        
        app.get('/commentaires', async function (req, res) {
            console.log("get commentaires");
            const resultat = (await getTables("commentaires",null,null,null,null)).rows;
            if (resultat.length > 0) {
                res.send({
                    message: "ALL commentaires data",
                    data: resultat
                });
            } else {
                res.send({
                    message: "commentaires data not found",
                });
            }
        })

        app.get('/message', async function (req, res) {
            console.log("get message");
            const resultat = (await getTables("message",null,null,null,null)).rows;
            if (resultat.length > 0) {
                res.send({
                    message: "ALL message data",
                    data: resultat
                });
            } else {
                res.send({
                    message: "message data not found",
                });
            }
        })

		app.get('/amis', async function (req, res) {
            console.log("get amis");
            const resultat = (await getTables("amis",null,null,null,null)).rows;
            if (resultat.length > 0) {
                res.send({
                    message: "ALL amis data",
                    data: resultat
                });
            } else {
                res.send({
                    message: "amis data not found",
                });
            }
        })

        
        
                    ///////////////
                    ///////////////       GET SINGLE DATA
                    ///////////////
        

app.get('/utilisateur/:email', async function (req, res) {
	console.log(req.params.email+" utilisateur data");
	const resultat = (await getTables("utilisateur","email",req.params.email,null,null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: req.params.email+" utilisateur data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email+" utilisateur data not found",
		});
	}
})

/*
app.get('/profil/:email', async function (req, res) {
	console.log(req.params.email+" profil data");
	const resultat = (await getTables("profil","email",req.params.email,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email+" profil succées");
		res.send({
			message: req.params.email+" profil data",
			data: resultat
		});
	} else {
		console.log(req.params.email+" profil not found");
		res.send({
			message: req.params.email+" profil data not found",
		});
	}
})
*/

app.get('/profil/EMAIL/:email', async function (req, res) {
	console.log(req.params.email+" profil data ghghghghghgh");
	const resultat = (await getProfilByList(req.params.email)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email+" profils succées yuuyuyuyuuyuyuyuy");
		res.send({
			message: req.params.email+" profils data tytytytytyty",
			data: resultat
		});
	} else {
		console.log(req.params.email+" profils not found tytytytyt");
		res.send({
			message: req.params.email+" profils data not found iuiuiuiuiuiuiu",
		});
	}
})





app.get('/post/:id_post', async function (req, res) {
	console.log(req.params.id_post+" post data");
	const resultat = (await getTables("post","id_post",req.params.id_post,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.id_post+" post succées");
		res.send({
			message: req.params.id_post+" post data",
			data: resultat
		});
	} else {
		console.log(req.params.id_post+" post failed");
		res.send({
			message: req.params.id_post+" post data not found",
		});
	}
})

app.get('/likes/:id_like', async function (req, res) {
	console.log("get likes");
	const resultat = (await getTables("likes","id_like",req.params.id_like,null,null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: req.params.id_like+" ALL likes data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.id_like+" likes data not found",
		});
	}
})

app.get('/commentaires/:id_commentaire', async function (req, res) {
	console.log("get commentaires");
	const resultat = (await getTables("commentaires","id_commentaire",req.params.id_commentaire,null,null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: req.params.id_commentaire+" ALL commentaires data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.id_commentaire+" commentaires data not found",
		});
	}
})

        


app.get('/message/:id_message', async function (req, res) {
	console.log("get message");
	const resultat = (await getTables("message","idlangue",req.params.id_message,null,null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: req.params.id_message+" ALL message data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.id_message+" message data not found",
		});
	}
})

app.get('/amis/:id_ami', async function (req, res) {
	console.log(req.params.id_post+" post data");
	const resultat = (await getTables("post","id_post",req.params.id_post,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.id_post+" post succées");
		res.send({
			message: req.params.id_post+" post data",
			data: resultat
		});
	} else {
		console.log(req.params.id_post+" post failed");
		res.send({
			message: req.params.id_post+" post data not found",
		});
	}
})


        



            ///////////////
            ///////////////       GET DATA WITH utilisateur
            ///////////////



app.get('/post/?EMAIL_UTILISATEUR/:email_utilisateur', async function (req, res) {
	console.log(req.params.email_utilisateur+"post post data");
	const resultat = (await getTables("post","email_utilisateur",req.params.email_utilisateur,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_utilisateur+" post succées");
		res.send({
			message: req.params.email_utilisateur+" UTILISATEUR post data",
			data: resultat
		});
	} else {
		console.log(req.params.email_utilisateur+" post failed");
		res.send({
			message: req.params.email_utilisateur+" post data not found",
		});
	}
})

app.get('/likes/?EMAIL_UTILISATEUR/:email_utilisateur', async function (req, res) {
	console.log(req.params.email_utilisateur+"candidat likes data");
	const resultat = (await getTables("likes","email_utilisateur",req.params.email_utilisateur,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_utilisateur+" likes succées");
		res.send({
			message: req.params.email_utilisateur+" UTILISATEUR likes data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email_utilisateur+" likes data not found",
		});
	}
})

app.get('/commentaires/?EMAIL_UTILISATEUR/:email_utilisateur', async function (req, res) {
	console.log(req.params.email_utilisateur+"candidat commentaires data");
	const resultat = (await getTables("commentaires","email_utilisateur",req.params.email_utilisateur,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_utilisateur+" commentaires succées");
		res.send({
			message: req.params.email_utilisateur+" UTILISATEUR commentaires data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email_utilisateur+" commentaires data not found",
		});
	}
})

        


app.get('/message/?EMAIL_EMETTEUR/:email_emetteur', async function (req, res) {
	console.log(req.params.email_emetteur+"candidat message data");
	const resultat = (await getTables("message","email_emetteur",req.params.email_emetteur,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_emetteur+" message succées");
		res.send({
			message: req.params.email_emetteur+"candidat message data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email_emetteur+" message data not found",
		});
	}
})

        

app.get('/message/?EMAIL_RECEPTEUR/:email_recepteur', async function (req, res) {
	console.log(req.params.email_recepteur+"candidat message data");
	const resultat = (await getTables("message","email_recepteur",req.params.email_recepteur,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_recepteur+" message succées");
		res.send({
			message: req.params.email_recepteur+"candidat message data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email_recepteur+" message data not found",
		});
	}
})


app.get('/amis/?EMAIL_UTILISATEUR1/:email_utilisateur1', async function (req, res) {
	console.log(req.params.email_utilisateur1+"candidat email_utilisateur1 data");
	const resultat = (await getTables("amis","email_utilisateur1",req.params.email_utilisateur1,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_utilisateur1+" amis 1 succées");
		res.send({
			message: req.params.email_utilisateur1+" amis 1 data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email_utilisateur1+" amis 1 data not found",
		});
	}
})

app.get('/amis/?EMAIL_UTILISATEUR2/:email_utilisateur2', async function (req, res) {
	console.log(req.params.email_utilisateur2+"candidat email_utilisateur2 data");
	const resultat = (await getTables("amis","email_utilisateur2",req.params.email_utilisateur2,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_utilisateur2+" amis 2 succées");
		res.send({
			message: req.params.email_utilisateur2+" amis 2 data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email_utilisateur2+" amis 2 data not found",
		});
	}
})


            ///////////////
            ///////////////       GET DATA WITH utilisateur ORDERED BY DATE
            ///////////////


app.get('/post/?EMAIL_UTILISATEUR/:email_utilisateur&DATE/any', async function (req, res) {
	console.log(req.params.email_utilisateur+" user post data order by date");
	const resultat = (await getPostsOrderByDate(req.params.email_utilisateur)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email_utilisateur+" user post succées order by date");
		res.send({
			message: req.params.email_utilisateur+" user POST likes data order by date",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.email_utilisateur+" user post order by date data not found",
		});
	}
})



            ///////////////
            ///////////////       GET DATA WITH POST
            ///////////////



app.get('/likes/?ID_POST/:id_post', async function (req, res) {
	console.log(req.params.id_post+"post likes data");
	const resultat = (await getTables("likes","id_post",req.params.id_post,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.id_post+" likes succées");
		res.send({
			message: req.params.id_post+" POST likes data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.id_post+" likes data not found",
		});
	}
})

app.get('/likes/?ID_POST/:id_post&EMAIL_UTILISATEUR/:email_utilisateur', async function (req, res) {
	console.log(req.params.id_post+" post and "+req.params.email_utilisateur+" user likes data");
	const resultat = (await getTables("likes","id_post",req.params.id_post,"email_utilisateur",req.params.email_utilisateur)).rows;
	if (resultat.length > 0) {
		console.log(req.params.id_post+" post and "+req.params.email_utilisateur+" user likes succées");
		res.send({
			message: req.params.id_post+" post and "+req.params.email_utilisateur+" user POST likes data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.id_post+" post and "+req.params.email_utilisateur+" user likes data not found",
		});
	}
})

app.get('/commentaires/?ID_POST/:id_post', async function (req, res) {
	console.log(req.params.id_post+"post commentaires data");
	const resultat = (await getTables("commentaires","id_post",req.params.id_post,null,null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.id_post+" commentaires succées");
		res.send({
			message: req.params.id_post+" POST commentaires data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.id_post+" commentaires data not found",
		});
	}
})






            //////////////
            //////////////          INSERT DATA
            /////////////


async function insertdata(table,pid, p2, p3, p4,p5, p6, p7, p8,p9) {

    if(table=="utilisateur"){
        connection.execute("insert into utilisateur values(:email,:nom,:prenom,:telephone,:password)", {
            email : pid,
            nom: p2,
            prenom: p3,
			telephone: p4,
			password: p5

        }, {
            autoCommit: true
        })

    }else if(table=="profil"){
        connection.execute("insert into profil values(:email,:nom_utilisateur,:photo_de_profil,:adresse,:Genre,to_date(:date_naissance,'YYYY/MM/DD'))", {
            email : pid,
            nom_utilisateur: p2,
            photo_de_profil: p3,
			adresse: p4,
			Genre: p5,
			date_naissance: p6

        }, {
            autoCommit: true
        })

    }else if(table=="post"){
        connection.execute("insert into post(id_post,email_utilisateur,nom_profil,text,image_url,date_post,photo_de_profil) values(post_id_seq.NEXTVAL,:email_utilisateur,:nom_profil,:text,:image_url,to_date(:date_post,'YYYY/MM/DD'),:photo_de_profil)", {
			email_utilisateur: p2,
			nom_profil: p3,
			text: p4,
			image_url: p5,
			date_post:p6,
			photo_de_profil: p7
        }, {
            autoCommit: true
        })
    }else if(table=="likes"){
        connection.execute("insert into likes values(like_id_seq.NEXTVAL,:email_utilisateur,:id_post,to_date(sysdate,'YYYY/MM/DD'))", {
			email_utilisateur: p2,
			id_post: p3,
			
        }, {
            autoCommit: true
        })
    }else if(table=="commentaires"){
        connection.execute("insert into commentaires values(comment_id_seq.NEXTVAL,:email_utilisateur,:nom_utilisateur,:id_post,:texte,to_date(sysdate,'YYYY/MM/DD'))", {
			email_utilisateur: p2,
			nom_utilisateur: p3,
			id_post: p4,
			texte: p5,
        }, {
            autoCommit: true
        })
    }else if(table=="message"){
        connection.execute("insert into message values(message_id_seq.NEXTVAL,:email_emetteur,:email_recepteur,:text,:image_url,to_date(:date_message,'YYYY/MM/DD'))", {
            email_emetteur: p2,
            email_recepteur: p3,
			text: p4,
			image_url: p5,
			date_message: p6
        }, {
            autoCommit: true
        })
    }else if(table=="amis"){
        connection.execute("insert into amis values(amis_id_seq.NEXTVAL,:email_utilisateur1,:email_utilisateur2)", {
            email_utilisateur1: p2,
            email_utilisateur2: p3
        }, {
            autoCommit: true
        })
	}
	
}


app.post('/utilisateur', async function (req, res) {
	let EMAIL = req.body.EMAIL;
	let NOM = req.body.NOM;
	let PRENOM = req.body.PRENOM;
	let TELEPHONE = req.body.TELEPHONE;
	let PASSWORD = req.body.PASSWORD;
	insertdata('utilisateur',EMAIL, NOM, PRENOM, TELEPHONE,PASSWORD,null,null,null,null);
	res.send({
		message: "utilisateur data inserted"
	})
	console.log("utilisateur data inserted")
})


app.post('/profil', async function (req, res) {
	let EMAIL = req.body.EMAIL;
	let NOM_UTILISATEUR = req.body.NOM_UTILISATEUR;
	let PHOTO_DE_PROFIL = req.body.PHOTO_DE_PROFIL;
	let ADRESSE = req.body.ADRESSE;
	let GENRE = req.body.GENRE;
	let DATE_NAISSANCE = req.body.DATE_NAISSANCE;
	insertdata('profil',EMAIL, NOM_UTILISATEUR, PHOTO_DE_PROFIL, ADRESSE,GENRE,DATE_NAISSANCE,null,null,null);
	res.send({
		message: "profil data inserted"
	})
	console.log("profil data inserted")
})

app.post('/post', async function (req, res) {
	let ID_POST = req.body.ID_POST;
	let EMAIL_UTILISATEUR = req.body.EMAIL_UTILISATEUR;
	let NOM_PROFIL = req.body.NOM_PROFIL;
	let TEXT = req.body.TEXT;
	let IMAGE_URL = req.body.IMAGE_URL;
	let DATE_POST = req.body.DATE_POST;
	let PHOTO_DE_PROFIL= req.body.PHOTO_DE_PROFIL;
	insertdata('post', null, EMAIL_UTILISATEUR,NOM_PROFIL,TEXT,IMAGE_URL,DATE_POST,PHOTO_DE_PROFIL,null,null);
	res.send({
		message: "post data inserted"
	})
	console.log("post data inserted")
})

app.post('/likes', async function (req, res) {
	
	let EMAIL_UTILISATEUR = req.body.EMAIL_UTILISATEUR;
	let ID_POST = req.body.ID_POST;
	
	insertdata("likes", null, EMAIL_UTILISATEUR, ID_POST,null,null,null,null,null,null);
	res.send({
		message: "likes data inserted"
	})
	console.log("likes data inserted")
})

app.post('/commentaires', async function (req, res) {
	let ID_COMMENTAIRE = req.body.ID_COMMENTAIRE;
	let EMAIL_UTILISATEUR = req.body.EMAIL_UTILISATEUR;
	let NOM_UTILISATEUR = req.body.NOM_UTILISATEUR;
	let ID_POST = req.body.ID_POST;
	let TEXTE = req.body.TEXTE;
	let DATE_COMMENTAIRE = req.body.DATE_COMMENTAIRE;

	insertdata("commentaires", null, EMAIL_UTILISATEUR,NOM_UTILISATEUR, ID_POST,TEXTE,DATE_COMMENTAIRE,null,null,null);
	res.send({
		message: "commentaires data inserted"
	})
	console.log("commentaires data inserted")
})


app.post('/message', async function (req, res) {
	let ID_MESSAGE = req.body.ID_MESSAGE;
	let EMAIL_EMETTEUR = req.body.EMAIL_EMETTEUR;
	let EMAIL_RECEPTEUR = req.body.EMAIL_RECEPTEUR;
	let TEXT = req.body.TEXT;
	let IMAGE_URL = req.body.IMAGE_URL;
	let DATE_MESSAGE = req.body.DATE_MESSAGE;

	insertdata("message", ID_MESSAGE, EMAIL_EMETTEUR,EMAIL_RECEPTEUR,TEXT,IMAGE_URL,DATE_MESSAGE,null,null,null);
	res.send({
		message: "message data inserted"
	})
	console.log("message data inserted")
})


app.post('/amis', async function (req, res) {
	let ID_AMI = req.body.ID_AMI;
	let EMAIL_UTILISATEUR1 = req.body.EMAIL_UTILISATEUR1;
	let EMAIL_UTILISATEUR2 = req.body.EMAIL_UTILISATEUR2;

	insertdata("amis", ID_AMI, EMAIL_UTILISATEUR1,EMAIL_UTILISATEUR2,null,null,null,null,null,null);
	res.send({
		message: "amis data inserted"
	})
	console.log("amis data inserted")
})






            //////////////
            //////////////          DELETE DATA
            /////////////


app.delete('/utilisateur/:email', async function (req, res) {
	connection = await run();
	await connection.execute("delete from utilisateur where email ='" + req.params.email+ "'")
	connection.commit();
	res.send({
		message: 'utilisateur data deleted'
	})
	console.log('utilisateur data deleted')
})


app.delete('/profil/:email', async function (req, res) {
	connection = await run();
	await connection.execute("delete from profil where email='" + req.params.email + "'")
	connection.commit();
	res.send({
		message: 'profil data deleted'
	})
	console.log('profil data deleted')
})

app.delete('/post/:id_post', async function (req, res) {
	connection = await run();
	await connection.execute("delete from post where id_post='" + req.params.id_post+"'")
	connection.commit();
	res.send({
		message: 'post data deleted'
	})
	console.log('post data deleted')
})

app.delete('/likes/:id_like', async function (req, res) {
	connection = await run();
	await connection.execute("delete from likes where id_like='" + req.params.id_like+"'")
	connection.commit();
	res.send({
		message: 'likes data deleted'
	})
	console.log('likes data deleted')
})

app.delete('/commentaires/:id_commentaire', async function (req, res) {
	connection = await run();
	await connection.execute("delete from commentaires where id_commentaire='" + req.params.id_commentaire+"'")
	connection.commit();
	res.send({
		message: 'commentaires data deleted'
	})
	console.log('commentaires data deleted')
})

app.delete('/message/:id_message', async function (req, res) {
	connection = await run();
	await connection.execute("delete from message where id_message='" + req.params.id_message+"'")
	connection.commit();
	res.send({
		message: 'message data deleted'
	})
	console.log('message data deleted')
})

app.delete('/amis/:id_ami', async function (req, res) {
	connection = await run();
	await connection.execute("delete from amis where id_ami='" + req.params.id_ami+"'")
	connection.commit();
	res.send({
		message: 'amis data deleted'
	})
	console.log('amis data deleted')
})

app.delete('/amis/?EMAIL_UTILISATEUR1/:email_utilisateur1/?EMAIL_UTILISATEUR2/:email_utilisateur2', async function (req, res) {
	connection = await run();
	await connection.execute("delete from amis where EMAIL_UTILISATEUR1='" + req.params.email_utilisateur1+"' and EMAIL_UTILISATEUR2='"+req.params.email_utilisateur2+"'")
	connection.commit();
	res.send({
		message: 'amis data deleted'
	})
	console.log('amis data deleted')
})





server.listen(port, () => {
	console.log("server running ... in "+port);
})










