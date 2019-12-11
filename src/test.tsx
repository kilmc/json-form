import React from "react";

const schema = {
  bestAlbums: [
    {
      title: "All Mirrors",
      artist: "Angel Olsen",
      releaseDate: "1/1/19"
    },
    {
      title: "Of Schlagenheim",
      artist: "black midi",
      releaseDate: "1/2/19"
    }
  ],
  bestSongs: [
    {
      title: "Janet",
      artists: "M. T. Hadley"
    }
  ]
};



const Form = () => {
  return (
    <form>
      <fieldset>
        <legend>Best albums</legend>
        <fieldset>
          <legend>#1</legend>
          <div>
            <label htmlFor="bestAlbumsTitle1">Title</label>
            <input id="bestAlbumsTitle1" type="text" value="All Mirrors" />
          </div>
          <div>
            <label htmlFor="bestAlbumsArtist1">Artist</label>
            <input id="bestAlbumsArtist1" type="text" value="Angel Olsen" />
          </div>
          <div>
            <label htmlFor="bestAlbumsReleaseDate1">Release date</label>
            <input id="bestAlbumsReleaseDate1" type="date" value="2019-07-22" />
          </div>
        </fieldset>
        <fieldset>
          <legend>#2</legend>
          <div>
            <label htmlFor="bestAlbumsTitle2">Title</label>
            <input id="bestAlbumsTitle2" type="text" value="Of Schlagenheim" />
          </div>
          <div>
            <label htmlFor="bestAlbumsArtist2">Artist</label>
            <input id="bestAlbumsArtist2" type="text" value="black midi" />
          </div>
          <div>
            <label htmlFor="bestAlbumsReleaseDate2">Release date</label>
            <input id="bestAlbumsReleaseDate2" type="date" value="2019-02-22" />
          </div>
        </fieldset>
      </fieldset>
      <fieldset>
        <legend>Best songs</legend>
        <fieldset>
          <legend>#1</legend>
          <div>
            <label htmlFor="bestSongsTitle1">Title</label>
            <input id="bestSongsTitle1" type="text" value="Janet" />
          </div>
          <div>
            <label htmlFor="bestSongsArtist1">Artist</label>
            <input id="bestSongsArtist1" type="text" value="M. T. Hadley" />
          </div>
          <div>
            <label htmlFor="bestSongsReleaseDate1">Release date</label>
            <input id="bestSongsReleaseDate1" type="date" value="2019-10-03" />
          </div>
        </fieldset>
      </fieldset>
    </form>
  );
};
