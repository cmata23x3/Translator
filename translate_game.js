// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var dict_keys = Object.keys(current_dict);	//array of the dictionary keys
	var word_count = dict_keys.length;			//count of keys in the dictionary
	var current_word = randomWord(); 			//current_word that's being guessed
//	console.log("This is the new word!: ", current_word);

	//insert the variable values into the html language spans. 
	$("#languageTo").html(lang_to);
	$("#languageFrom").html(lang_from);
	$("#word").html(current_dict[current_word]);
	buildHeader();

	//build the heading first row and add it into the table
	function buildHeader(){
		var table = document.getElementById("results");
		var new_row = table.insertRow(0);
		var cell1 = new_row.insertCell(0);
		var cell2 = new_row.insertCell(1);
		var cell3 = new_row.insertCell(2);

		cell1.innerHTML = lang_from;
		cell2.innerHTML = lang_to;
		cell3.innerHTML = "Answer";
		$(new_row).addClass("topHeading");
	}

	//Function to generate a random word
	function randomWord(){
		var index = Math.floor(Math.random()*word_count);
		return dict_keys[index];
	}

	function checkAnswer(input){
		if(input === ""){
			return;
		}
		var table = document.getElementById("results");
		var new_row = table.insertRow(2);
		var cell1 = new_row.insertCell(0);
		var cell2 = new_row.insertCell(1);
		var cell3 = new_row.insertCell(2);

		//add results to the table
		//case that guess is correct
		if (current_word == input){
			cell1.innerHTML = current_dict[current_word];
			cell2.innerHTML = current_word;
			cell3.innerHTML = "<span class='ui-icon ui-icon-check'></span>";
			$(new_row).addClass("pastTrue");
		}
		//case that guess is wrong
		else{
			cell1.innerHTML = current_dict[current_word];
			cell2.innerHTML = "<strike>" + input + "</strike>";
			cell3.innerHTML = current_word;
			$(new_row).addClass("pastFalse");
		}
		$( "#guess" ).autocomplete( "close" ); //make sure to close the autocomplete!
		resetQuestion();
	}

	function resetQuestion(){
		//prompt new word!
		current_word = randomWord();
		$("#word").html(current_dict[current_word]);
		//console.log("This is the new word!: ", current_word);

		//clear the input at the end
		$("#guess").val('');
		//reset focus
		$("#guess").focus();
	}

	//Autocomplete function
	$( "#guess" ).autocomplete({
		minLength: 2,
		select: function(event, ui){
		//	console.log("reacting to the autocomplete function", ui.item.value);
			checkAnswer(ui.item.value);
			return false;
	},
    	source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( dict_keys, function( item ){
              return matcher.test( item );
          }) );
      }
    });

	// Button Click listener
	var button = $("#answerButton");
	$(button).click(function() {
		//retrieve the value;
		var input = $("#guess").val();
	//	console.log("reacting to the button stroke", input);

		//Call check answers function
		checkAnswer(input);

	});

	//Enter key listener
	$('#guess').keyup(function(e) {
		if(e.keyCode == 13) {

			var input = $("#guess").val();
	//		console.log("reacting to the return stroke", input);
			checkAnswer(input);
		}
	});

	//focus on the input field
	$(this).find("#guess").focus();

    });
