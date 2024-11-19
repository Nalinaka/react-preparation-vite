import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
        fetchPosts(searchId);
  }

  async function fetchPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPosts(data);
    setLoading(false);
  }

  
  function onSearchKeyPress(key) {
    if (key === 'Enter') {
        onSearch()
    }
}

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="post__search">
        <Link to="/">
        <button>← Back</button>
        </Link>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input type="number" value={searchId} onChange={(event) => setSearchId(event.target.value)} />
          onKeyPress={(event) => onSearchKeyPress(event.key)}
    {/* At top tech companies you will see code written like this:   */}
    {/* onKeyPress={(event) => event.key === 'Enter' && onSearch()}  */}

          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map(post => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
};

export default Posts;


// Using query strings and you need to fetch it
// This is done by useParams. Steps:
// 1) Import useParams (above line 2)
// 2) Add function const Posts= () => { }
// 3) Add const { id } = useParams ();
// 4) console.log(id); to check if you
// get object will show id: with a number
// e.g. id: 5.
// 5) Return ( );
// 6) (line 21-23) - <div> {id} </div>
// 7) Add API link, for this example go to
// jsonplaceholder.typicode.com/posts/1 - you
// reference the Routes on jsonplaceholder.typicode.com,
// it shows Routes - GET Posts/1 - we use this one as
// this is the user id fetch request. Click on it for link.
// 8) Change console.log to console.log(fetch
// ("jsonplaceholder.typicode.com/posts/1"));
// 9) Change the console.log as it may cause issues, remove.
// 10) Input  "useEffect(() => { }, []);" after const id..."
// 11) Change (line 1, add useEffect)
//  "import React, {useEffect} from "react-router-dom"
// 12) Inside useEffect add await fetch link (typicode link), this fetches the data:
// "const data = await fetch ("https://jsonplaceholder.typicode.com/posts/1")"
// When you console.log the data you get a promise in the console. get the Response
// using async function inside (line):
// async function fetchPosts () { const data... }
// 13) Fetch posts - call the function
// // When you need to access link and fetch it needs to be fetched
// using an await function
// 14) You need to add: "const data2 = await data.json()"
// 15) Add:  console.log(data2);
// Need to await twice just to get the data, on lines 38 and 40.
// However if we want to await once only you can use axios!!
// 16) Need to "yarn add axios"
// 17) Line 3 add " import axios from 'axios' "
// 18) Remove line (console log data 2)
// 19) Remove line: "const data2 = await data.json()""
// 20) Change line:  const data = await fetch to below:
// 21) const data = await axios.get("https://jsonplaceholder.....
// 22) Change the const and console.log to have response (better practice):
// 23) const response = await axios.get... and console.log(response.data);
// 24) To make the data pull the different ID's link needs to be changed to:
// ("https://jsonplaceholder.typicode.com/posts?userId1"). This however does
// NOT make it Dynamic! In order to do this must change it to:
// (`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`);
// 25) Next step is to render the posts, to do this we need a map:
// 26) After return change contents of div from {id} to:
// {data.map(post => <div> {post.id}</div>)}
// When you do this it will throw an error saying 'data not defined'.
// 27) In order to define the data (which is only in a const function
// currently) we need to add new code under const {id} = useParams();:
// let data {};
// 28) Line 22 should be: const {data} = await axios.get....
// 29) Line 18 after  const { id } = useParams add:
//  const [posts, setPosts] = useState([]);
// 30) After line 22, on 23 add:     setPosts(data);
// 31) UseState needs to be added, first add next to useEffect line 1 import.
// 32) useState is a fancy way of declaring a variable:
// posts.map in the same line as (point 26) changing data.map to posts.map
// 33) Also change the posts.title - that needs to be added in so title displays:
// 34) {data.map(post => <div> {post.title}</div>)} (changed id to title)
// // 35) When the component first mounts, the value of post is whatever is inside
// the useState(), reference point 29. At the moment it is undefined.
// You need an array to map, it cannot stay undefined. How do we fix this?
// You can have an empty array which is defined as empty brackets: [],
// so it would be useState([]) reference point 29.
// 36) You can take posts.html div data and replace:
// {data.map(post => <div> {post.id}</div>)} with the data from posts.html
//  inside the div (after return).
// 37) Changes made to the data, used posts.map (reference lines 41-45).
// ***IMPORTANT NOTE: When creating a map you need to return it for it to work!***
// Or add paranthesis, options:
// 38) Option 1:
//  {
// posts.map((post) => (
//   <div className="post">
//   <div className="post__title">{post.title}</div>
//   <p className="post__body">{post.body}</p>
//  </div>
//  ))}
// 39) Option 2:
//   {
// posts.map(post => {
//   return <div className="post">
//   <div className="post__title">{post.title}</div>
//   <p className="post__body">{post.body}</p>
//  </div>
//  })}
// 40) Next step is the SKELETON LOADING STATE, when it loads and its
// greyed out. Ensure this is in the write part of the code. Steps to add:
// Step 1: Under the two consts, add another const:
// const [loading, setLoading] = useState(true); (set to true for now)
// Step 2: Under setPosts(data); add following:
// setLoading(false);
// Step 3: Add re render for loading after enter button:
//  { loading ? (
//     div class skeleton code as seen above
//  ):(
//     post.map code as seen above
//  ))
//  )}
//  </>
//  );
//  };
// Step 4: If we want multiple loading states we need to create an empty array:
// Sits under code:
//  { loading ? (
// ? new Array(10).fill(0).map((element, index) => (
// The new array of 10 - means 10 users, mapping over it, each element of 
// array turned into the code that comes underneath it!
// Step 5: Need to move the skeleton code inside divs to correct place: 
// Final code looks like this (with loading code): 
//      {loading
// ? new Array(10).fill(0).map((element, index) => (
//     <div className="post">
//       <div className="post__title">
//         <div className="post__title--skeleton"></div>
//       </div>
//       <div className="post__body">
//         <p className="post__body--skeleton"></p>
//       </div>
//     </div>
//   ))
// : posts.map((post) => (
//     <div className="post" key={post.id}>
//       <div className="post__title">{post.title}</div>
//       <p className="post__body">{post.body}</p>
//     </div>
//   ))}
// Step 6: Change the enter button to onClick and onSearch for when you look
// up userid.
// <button onClick={() => onSearch()}>Enter</button>
// **NOTE**  ? new Array(10).fill(0).map((_, index) => (
// Can remove the element word and have _ instead. Also you will need to add
// code: <div className="post" key={index}> add key inside next to post 
// (code under array)
// Step 7: Create onSearch function before useEffect code: 
//   function onSearch() {
//     console.log("onSearch()");
//   }
// Step 8: Add http element in react under number type, using onChange
//  and value code: 
// <input type="number" value={searchId} onChange={(event) =>
//  setSearchId(event.target.value)} />
// Step 9: creating a new const function: 
// const [searchId, setSearchId] = useState(id); Will use id to mount initially. 
// Summarize the steps: 1) created variable = const (searchId etc) 
// 2) Placed it under value 
// 3) using event.target.value 4) Using onChange.
// 41) After function onSearch remove console.log("onSearch()"); 
// and add fetchPosts(searchId)
// 42) Add userId inside of async function: async function fetchPosts(userId) {
// 43) Move the code around: CFAUFRL: 
// Const, Function, async function, useEffect, Fetch, Return, Loading state
// const Posts = () => {
//   const { id } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchId, setSearchId] = useState(id);
//   function onSearch() {
//     fetchPosts(searchId)
//   }
//   async function fetchPosts(userId) {
//     const { data } = await axios.get(
//       `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
//     );
//     setPosts(data);
//     setLoading(false);
//   }
//   useEffect(() => {
//     fetchPosts();
//   }, []);
//   return (
// 44) Add onKeyPress - this helps you search userId and then click "enter":
// Add it under onChange code that has event.target.value: 
// onKeyPress={(event) => onSearchKeyPress(event.key)} value gives you value, 
// but key gives you the key that you pressed.
// At top tech companies you will see code written like this:  
// onKeyPress={(event) => event.key === 'Enter' && onSearch()} 
// 45) Add new function async function, after setPosts and setLoading: 
// function onSearchKeyPress(key) {
//     if (key === 'Enter') {
//         onSearch()
//     }
// }
// 46) Need to add a skeleton loading state when we press enter. Do this by
// adding under the async function:   setLoading(true);
// 47) Add in functionality so that when you click back, it will take you 
// to the home page, do this under return post search, add Link:
// <Link to="/">
//  <button>← Back</button> 
// </Link>
// 48) Add Link to imports: import {Link, useParams} from "react-router-dom";
// 49) Style homepage, code was given under home.html, but will be taking this out 
// and adding this to Home.jsx under src/pages, will need to add additional amount of
// code: 

// IMPORT:
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// CONST FUNCTION:
// const Home = () => {
// const [users, setUsers] = useState([]);
// const navigate = useNavigate();

//   ASYNC FUNCTION:
//   async function getUsers() {
//   const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
//   setUsers(data);
//   }

// USEEFFECT AND DIV CONTAINER CODE:
// useEffect(() => {
//   getUsers();
// }, []);
// return (
//   <div className="container">
//   <div className="row">
//   <div className="user-list">
//    {users.map((user) => (
// <div className="user" key={user.id} onClick={() => navigate(`${user.id}`)}>
//  <div className="user-card">
//  <div className="user-card__container">
//      <h3>{user.name}</h3>
//      <p><b>Email:</b> {user.email}</p>
//      <p><b>Phone:</b> {user.phone}</p>
//      <p>
//      <b>Website:</b>
//      {user.website}
//      </p>
//  </div>
//  </div>
//  </div>
//  ))}
//  </div>
//  </div>
//  </div>
// );
// };
// export default Home; 

// Setting users to data (setUsers(data);) will re render the users Component when
// it changes.
// 50) Summary: 
// 1) Used loading state with an array of 10 (this is how you loop in react)
// 2) Additional was a skeleton loading state
// 3) Mapping over all the posts dynamically
// 4) Mount by fetching posts async function
// 5) Calling await axios - by using userId if its available, otherwise id.
// 6) Search used onChange event.target.value to search by value
// 7) Also used onSearch so we could search by enter button
// 8) When going to function onSearch it passes the searchId. 
// NOTES:
// ***IF YOU WANT TO ROUTE PROGRAMMATICALLY***
// 1) Import useNavigate - add this next to Link and useParams.
// 2) Under const posts = () => { Add code: 
// 3) let navigate = useNavigate(); 
// 4) Remove link as seen in step 47 and replace code: 
// 5) <button onClick={() => {navigate('/')}>← Back</button>
// So use Navigate, create variable and then pass it
// Function with paranthesis are called immediately!


// ADDITIONAL NOTES:

// when you enter rfc you get framework:

// export default function Posts() {
//   return (
//     <div>
//     Posts
//     </div>
//   )
// }
