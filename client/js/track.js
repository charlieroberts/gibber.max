let Track = function( Gibber, id ) {
  // seq~ schedule format:
  // add <seqid> <phase> <arguments...>
  // seqid is the beat number
  // phase is 0..1 within that beat
  // arguments is a max message, as space-delimited strings and numbers
  
  //var msgstring = "add " + beat + " " + t + " " + n + " " + v + " " + d 
  let track = {
    id,
		sequences:{},

    note( notenum, velocity=127, duration=250 ) {
      notenum = Gibber.Theory.Note.convertToMIDI( notenum )

      var msg = `note ${notenum} ${velocity} ${duration}`
      Gibber.Communication.send( msg )
    },

    cc( ccnum, value ) {
      var msg =  `cc ${ccnum} ${value}`
      Gibber.Communication.send( msg )
    },

    chord( chord, velocity=127, duration=250 ) {
      let msg = []
      
      if( typeof chord === 'string' ) {
        let chordObj = Gibber.Theory.Chord.create( chord )

        chord = chordObj.notes 

        for( let i = 0; i < chord.length; i++ ) {
          let note = chord[ i ] // Gibber.Theory.Note.convertToMIDI( chord[i] )
          msg.push( `note ${note} ${velocity} ${duration}` )
        }
      }else{
        for( let i = 0; i < chord.length; i++ ) {
          let note = Gibber.Theory.Note.convertToMIDI( chord[i] )
          msg.push( `note ${note} ${velocity} ${duration}` )
        }
      }

      Gibber.Communication.send( msg )
    },
  }

  Gibber.Environment.codeMarkup.prepareObject( track ) 
  Gibber.addSequencingToMethod( track, 'note' )
  Gibber.addSequencingToMethod( track, 'cc' )
  Gibber.addSequencingToMethod( track, 'chord' )
	
  return track
}

module.exports = Track
