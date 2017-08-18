const Products = require('../../mySql/connection').Products;

const root = {

  /**
  * @param id the product id
  * @return product information
  */
  getProduct: function ({id}) {
    return new Promise((resolve, reject) => {
      Products.findOne({where: {id: id}})
          .then(products => {
            resolve(products.dataValues);
            console.log(products.dataValues);
          })
          .catch(err => {
            reject(false);
            console.log('err');
          })
    });
  },

  /**
  * @param input the product information, such as name, price, description and imageUrl
  * @return string 'Created' or error
  */
  createProduct: function ({input}) {
    return new Promise((resolve, reject) => {
      Products.create(input)
        .then(() => {
          resolve('Created');
          console.log('Created');
        })
        .catch(err => {
          reject('Err: '+err);
          console.log('Err');
        });
    });
  },

  /**
  * @param id the product id
  * @param input the product information, such as name, price, description and imageUrl
  * @return string 'Updated' or error
  */
  updateProduct: function ({id, input}) {
    return new Promise((resolve, reject) => {
      Products.update(input, {where: {id: id}})
        .then(() => {
          resolve('Updated');
          console.log('Updated');
        })
        .catch(err => {
          reject('Err: '+err);
          console.log('Err');
        });
    });
  },
  
  /**
  * @param id the product id
  * @return string 'Deleted' or error
  */
  deleteProduct: function ({id}) {
    return new Promise((resolve, reject) => {
     Products.destroy({where: {id: id}})
        .then(() => {
          resolve('Deleted');
          console.log('Deleted');
        })
        .catch(err => {
          reject('Err: '+err);
          console.log('Err');
        });
    });
  },
};

module.exports = root;