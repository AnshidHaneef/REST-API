const model = require('../models/productModel')
// const db = require('../config/connections')


module.exports = {

    addProduct : (data)=>{
        return new Promise  ((resolve,reject)=>{
            model.create(data).then((product)=>{
                resolve(product)
            })
        })
    },

    getProduct : ()=>{
        return new Promise ((resolve,reject)=>{
             let  product = model.find()
             resolve(product);
        })
    },

    getOneProduct: (id)=>{
        return new Promise ((resolve,reject)=>{
            let product = model.findById(id)
            resolve(product)
        })
    },

    editProduct:(id,data)=>{
        return new Promise ((resolve,reject)=>{
             model.findByIdAndUpdate(id , data).then((updatatd)=>{
                 resolve(updatatd)
             })

        })
    },

    deleteProduct:(id)=>{
        return new Promise((resolve,reject)=>{
            model.findByIdAndDelete(id).then((deleted)=>{
                resolve(deleted)
            })
        })
    }

}   