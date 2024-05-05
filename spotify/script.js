console.log("let's start java script"); 



async  function getsongs(){

    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
 
    console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
let as  = div.getElementsByTagName("a")
console.log(as);
let songs  = []
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1]);
    }
    
}
return songs;
}

let audio = new Audio();
const playmusic = (track)=>{
    audio.pause();
    audio = new Audio("/songs/"+track);
   
audio.play()
}
async function main(){

    let songs =await getsongs();
    console.log(songs)
//show all the songs in the playlist
   let songul =  document.querySelector(".songlist ").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songul.innerHTML = songul.innerHTML + ` <li>
    <img  class="invert"  src="music.svg" alt="">
    <div class="info">
     
    <div>${song.replaceAll("%20copy%", " ")}</div>

        <div>vishal</div>
      
    </div>
  
    <div class="playnow">
        <span>Play Now</span>
        <img class="invert" src="play.svg" alt="">
    </div>
   
 
   </li>`;
    
  }
  //attach an eventlistener to each song
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{

        console.log(e.querySelector("div").firstElementChild.innerHTML);
        playmusic(e.querySelector("div").firstElementChild.innerHTML);
    })

    
  });
  //attach  an event listener to play,next and previous


 }

main();