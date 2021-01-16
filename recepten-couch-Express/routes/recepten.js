var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const DB_URL = "https://31e7fa29-c19a-46bb-bcec-7d372b47bb76-bluemix.cloudant.com/recepten/";
const DB_VIEWS = "_design/views/_view/";

// GET ALL PRODUCTS
router.get('/', (req, res) => {
  axios.get(DB_URL + DB_VIEWS + 'allRecepten')
    .then(function (response) {
  // console.log(response.data.rows)
   //res.render('list.ejs', { recepten: response.data.rows });

    response = response.data.rows.map(valueData => valueData.value);
     res.json(response)

    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
})

// SHOW ADD PRODUCT FORM
//router.get('/add', (req, res) => {
 // res.render('add.ejs', {});
// })

// ADD PRODUCT TO DB
router.post('/add', (req, res) => {
  axios.post(DB_URL, req.body)
  .then(response => res.redirect('/'))
  .catch(error => console.log(error));
})

// SEARCH FORM
//router.get('/searchOne', (req, res) => {
 // res.render('search.ejs', {});
// })

// FIND A PRODUCT
router.post('/searchAll', (req, res) => {
  console.log(DB_URL + DB_VIEWS + 'allRecepten' + '?key="' + req.body.naam + '"');
  axios.get(DB_URL + DB_VIEWS + 'allRecepten' + '?key="' + req.body.naam + '"')
    .then(function (response) {
         // res.render('search_result.ejs', { recept: response.data.rows[0].value });
          res.json(response.data.rows.map(valueData => valueData.value))
    })
    .catch(function (error) {
      console.log(error);
    })
})
// FIND A PRODUCT
router.post('/searchOne', (req, res) => {
  console.log(DB_URL + DB_VIEWS + 'allRecepten' + '?key="' + req.body.naam + '"');
  axios.get(DB_URL + DB_VIEWS + 'allRecepten' + '?key="' + req.body.naam + '"')
    .then(function (response) {
      console.log(response.data.rows[0].value)
        res.json(response.data.rows[0].value)})
        // res.json(response.data.rows.map(valueData => valueData.value))
    .catch(function (error) {
      console.log(error);
    })
})



// DELETE A PRODUCT 
router.post('/delete', (req, res) => {
  console.log(DB_URL + DB_VIEWS + 'allRecepten' + '?key="' + req.params.naam + '"');
  axios.get(DB_URL + DB_VIEWS + 'allRecepten' + '?key="' + req.params.naam + '"')
  .then(function (response) {
    //console.log(response.data);
    if(response.data.rows[0]) {
      var id = response.data.rows[0].value._id
      var rev = response.data.rows[0].value._rev
      axios.delete(DB_URL + id + '?rev=' + rev).then(response => res.redirect('/') ).catch(error => console.log(error) )
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  
  //edit data
  router.get('/edit', (req, res) => {
    axios.get(DB_URL + DB_VIEWS + 'allRecepten' + '?key="' + req.body.naam + '"')
    .then(function (response) {
        res.json(response.data.rows[0].value)
        // res.json(response.data.rows.map(valueData => valueData.value))
    .catch(function (error) {
      console.log(error);
    })
  })
})

  // UPDATE A PRODUCT 
  router.post('/edit', (req, res) => {
  //console.log(req.body)
  // _rev is in the document!
    axios.put(DB_URL + req.body._id, req.body)
      .then(response => res.redirect('/'))
      .catch(error => console.log(error));
})
})


// DELETE A PRODUCT WITHOUT VIEW LOOKUP
/*router.post('/delete', (req, res) => {
  var id = req.body.id
  axios.get(DB_URL + id)
  .then(function (response) {
    axios.delete(DB_URL + id + '?rev=' + response.data._rev).then(response => res.redirect('/')).catch(error => console.log(error))
  })
  .catch(function (error) {
    console.log(error);
  })
})*/

module.exports = router;