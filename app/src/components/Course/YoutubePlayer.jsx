// import YouTube from "react-youtube";

// function YoutubePlayer({ url }) {
//   const onPlayerReady = (event) => {
//     // access to player in all event handlers via event.target
//     const player = event.target;
//     const intervalId = setInterval(() => {
//       if (player.getCurrentTime() >= 5) {
//         player.pauseVideo();
//         // handleEvent();
//         clearInterval(intervalId);
//       }
//     }, 1000);

//     return () => clearInterval(intervalId);
//     // event.target.pauseVideo();
//   };

//   const opts = {
//     height: "100%",
//     width: "100%",
//     playerVars: {
//       // https://developers.google.com/youtube/player_parameters
//       autoplay: 1,
//     },
//   };

//   // const getVideoId = (videoLink) => {
//   //   const urlParts = videoLink.split("/");
//   //   const lastPart = urlParts[urlParts.length - 1];
//   //   const videoId = lastPart.split("?")[0];
//   //   console.log(videoId);
//   //   return videoId;
//   // };

//   // const videoId = getVideoId(url);

//   return (
//     <>
//       <YouTube videoId={url} opts={opts} onReady={onPlayerReady} />;
//       {/* <button onClick={handleClick}>Get Time</button> */}
//     </>
//   );
// }

// export default YoutubePlayer;
