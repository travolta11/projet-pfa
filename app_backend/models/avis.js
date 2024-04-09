const db=require("../config/db");
class Avis{

//get avis..............................................
    static async getAllAvis() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM avis", (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
//get avis..........................................


//add avis.........................................................................
static async addAvis(id_tourist,id_monument,note) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO avis (id_tourist,id_monument,note) VALUES (?,?,?)",
            [id_tourist,id_monument, note], (error, results) => {
                if (!error) {
                    resolve(true);
                } else {
                    console.error('Error adding avis:', error);
                    reject(false);
                    
                }
            });
    });
}

//add avis.........................................................................


//delete avis......................................................................
static async deleteAvis(avisId) {
    return new Promise((resolve) => {
        db.query('DELETE FROM avis WHERE id = ?', [avisId], (error, results) => {
            if (!error) {
                resolve(true);
            } else {
                console.error('Error deleting avis:', error);
                resolve(false);
            }
        });
    });
}
//delete avis......................................................................

//update avis......................................................................
static async updateAvis(avisId, newData) {
    return new Promise((resolve) => {
        db.query('UPDATE avis SET ? WHERE id = ?', [newData, avisId], (error, results) => {
            if (!error) {
                resolve(true);
                console.log(newData)
            } else {
                console.error('Error updating avis:', error);
                resolve(false);
            }
        });
    });
}
//update avis......................................................................

//get by id avis...................................................................
static async getAvisById(avisId){
    return new Promise((resolve)=>{
        db.query('SELECT * FROM avis WHERE id = ?',[avisId],(error,results)=>{
            if(!error){
                resolve(results[0]);
            }
            else{
                resolve(false)
            }
        })
    })

}

//get by id avis...................................................................
}
module.exports=Avis
