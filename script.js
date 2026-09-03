// async function getsongs() {
//   let response = await fetch("http://127.0.0.1:5500/songs/");
//   let text = await response.text();
  
//   let div = document.createElement("div");
//   div.innerHTML = text; // Fix 1: Use 'text' instead of 'response'

//   let as = div.getElementsByTagName("a");
//   let songs = [];

//   for (let index = 0; index < as.length; index++) {
//     const element = as[index]; 
//     const href = element.getAttribute("href"); // Extract relative href attribute

//     // Fix 3: Safely check for .mp3 files
//     if (href && href.endsWith(".mp3")) {
//       songs.push(href.split("/")[2])
//     }
//   }

// //   console.log(songs);
//   return songs;
// }


// const playMusic=(track)=>{
//   let audio = new Audio( "/song name" +track)
//   audio.play()
// }

// // http://127.0.0.1:5500/song%20name
// async function main() {

//   let currentsongs;


//     //get the list of all songs
//     let songs = await getsongs();
//     console.log(songs)

//     // show all the songs in the playlist
//     let songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]

//     for (const song of songs) {
//       songUL.innerHTML = songUL.innerHTML + ` <li>
//                                 <img  class="invert" src="music.svg" alt="">
//                                 <div class="info">
//                                     <div>${song.replaceAll("%20"," ")} </div>
//                                     <div>Vishal</div>
//                                 </div>
//                                 <div class="playnow">
//                                     <span>Play Now</span>
//                                     <img  class="invert" src="play.svg" alt="">
//                                 </div>
                                

//                             </li>`
      
//     }

//     // Attach an eventlistener to each song

//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
//       e.addEventListener("click" , element=>{
//         console.log(e.querySelector(".info").firstElementChild.innerHTML)
//         playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        

//       })
      

//     })









   
    


    
// }
// main();



async function getsongs() {
  let response = await fetch("http://127.0.0.1:5500/songs/");
  let text = await response.text();

  let div = document.createElement("div");
  div.innerHTML = text;

  let as = div.getElementsByTagName("a");
  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    const href = element.getAttribute("href");

    if (href && href.endsWith(".mp3")) {
      // Safely extract just the filename from the end of the path
      songs.push(href.split("/").pop());
      
    }
  }

  return songs;
}

// Pass the exact filename to the correct folder path (/songs/)
const playMusic = (track) => {
  let audio = new Audio("/songs/" + track);
  audio.play();
};

async function main() {
  let songs = await getsongs();

  let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  songUL.innerHTML = ""; // Clear existing items

  for (const song of songs) {
    // Decode %20 and special characters strictly for UI display
    let displayName = decodeURIComponent(song);

    // Store the exact raw filename in data-song attribute
    songUL.innerHTML += `<li data-song="${song}">
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>${displayName}</div>
            <div>Vishal</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" src="play.svg" alt="">
        </div>
    </li>`;
  }

  // Read the exact raw filename from dataset on click
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", () => {
      let track = e.dataset.song;
      playMusic(track);
    });
  });
}

main();