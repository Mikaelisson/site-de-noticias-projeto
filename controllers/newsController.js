const { render } = require("ejs");
const { model, get } = require("mongoose");
const News = require("../models/News");
const User = require("../models/User");


const all = async ( req, res ) => {
    
  try {    
    let news = await News.find({});
    news.reverse();
    
    let sessionLogin = req.session.login;
    let user = await User.findOne({ email: sessionLogin });

    res.render("index.ejs", { news, sessionLogin, user });
  } catch (error) {
    res.send(error);
  }

}

const renderAdd = ( req, res ) => {
  res.render("add")
}

const add = async ( req, res ) => {

  let sessionLogin = req.session.login;
  
  try {    
    let user = await User.findOne({ email: sessionLogin });

    if(sessionLogin && user.permission === "admin"){
      
    let news = new News({
      title: req.body.title,
      file: req.file.filename,
      txt:  req.body.txt,
    });

    await news.save();
    res.redirect('/');
    }else{
      console.log("VOCE NÃO TEM PERMISSÃO")
    }
  } catch (error) {
    res.send(error);
  }

}

const edit = async ( req, res ) => {

  let id = req.params.id;

  try {
    let doc = await News.findById(id);
    res.render('edit', { error: false, body: doc });
  } catch (error) {
    res.send(error);
  }

}

const editDoc = async ( req, res ) => {

  let id = req.params.id;
  if(!id){
    id = req.body.id;
  }

  let news = {}  
  news.title = req.body.title;
  news.file = req.file.filename;
  news.txt = req.body.txt;  

  try {
    await News.updateOne( {_id: id}, news);
    res.redirect('/');
  } catch (error) {
    res.render('edit', { error, body: req.body });
  }

}

const deleteById = async ( req, res ) => {

  let id = req.params.id;
  if(!id){
    id = req.body.id;
  }

  try {
    await News.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    res.status(404).send(error);
  }

}

const renderRegister = ( req, res ) => {
  res.render('register')
}

const register = async ( req, res ) => {
  
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    permission: "standard",
  });
  
  try {
    let doc = await User.findOne({ email: user.email });

    if(doc){
      res.redirect('login')
    }else{
      await user.save();
      res.redirect('login')
    }
    } catch (error) {
    res.send(error);
    }
}

const renderLogin = ( req, res ) => {
  req.session.login = ""; 
  res.render('login');
}

const login = async ( req, res ) => {
  
  let email = req.body.email;
  let password = req.body.password;


  try {
    let doc = await User.findOne({ email, password });
    if(doc.email === "") throw new Error("Usuário não existe");
    if(doc.email === email && doc.password === password){
      req.session.login = doc.email;
      res.redirect('/');
    }
  } catch (error) {
    res.send(error.message);
  }

}

module.exports = { add, all, edit, editDoc, deleteById, renderAdd, renderLogin, renderRegister, register, login };
