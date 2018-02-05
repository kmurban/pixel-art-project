
//Declare and initialize the key variables that we'll need for the pixel-picker app
//Key variables include the grid and cell dimensions, artwork color, and user input elements 

let gridWidth = 0;
let gridHeight = 0;
let cellDim = 0;
let color = '#dc42f4';

var widthInput = $('#width');
var heightInput = $('#height');
var colorInput = $('#color');

//The following two functions change the color of the buttons when they are moused over 
//The color change helps to make it clear to the user that these are clickable elements

$('button').mouseover(function(){
	$(this).css('background-color','#637fa3');
})

$('button').mouseout(function(){
	$(this).css('background-color','#babdc1');
})

//Reads in the user's input for grid width and height, and sets the cell dimensions accordingly
//The getDimensions function assumes we want square cells in a grid of around 750x750px

function getDimensions() {
	gridWidth = widthInput.val();
	gridHeight = heightInput.val();
	if (Math.floor(700/gridWidth) < Math.floor(700/gridHeight)) {
		cellDim = Math.floor(700/gridWidth);
	} else {
		cellDim = Math.floor(700/gridHeight);
	}
}

//Reads in the user's input for artwork color, and sets the "color" variable accordingly

function getColor() {
	color = colorInput.val();
}

//The following two functions are helpers for "makeGrid"
//The makeRows function sets up block divs according to the user's input for the grid height
//The fillRows function fills each row div with inline-block cells

function makeRows(numRows) {
	for (i = 0; i < numRows; i++) {
		$('<div class = "grid-row"></div>').appendTo($('.grid'));
	}
	$('.grid-row').css('height', cellDim);
}

function fillRows(numColumns){
	var rows = $('.grid-row').get();
	for (i = 0; i < rows.length; i++){
		var thisRow = rows[i];
		for (j = 0; j < numColumns; j++) {
			$('<div class = "grid-cell"></div>').appendTo(thisRow);	
		}
	}
	$('.grid-cell').css('width', cellDim);
	$('.grid-cell').css('height', cellDim);
}

//Tidies up the grid outer grid borders to match borders at which two cells meet 
//Non-critical, but makes the grid look nicer :) 

function styleBorder() {
	var rows = $('.grid-row').get();
	for (i = 0; i < rows.length; i++){
		var thisRow = rows[i];
		var firstCell = $(thisRow).children().first();
		var lastCell = $(thisRow).children().last();
		firstCell.css({"border-left-color": "#000000", "border-left-width":"2px", "border-left-style":"solid"});
		lastCell.css({"border-right-color": "#000000", "border-right-width":"2px", "border-right-style":"solid"});
		if (i == 0) {
			$(thisRow).children().css({"border-top-color": "#000000", "border-top-width":"2px", "border-top-style":"solid"});
		}
		if (i == (rows.length - 1)) {
			$(thisRow).children().css({"border-bottom-color": "#000000", "border-bottom-width":"2px", "border-bottom-style":"solid"});
		}
	}
}

//Creates the grid using the helpers defined above

function makeGrid(width,height) {
	makeRows(height);
	fillRows(width);
	styleBorder();
}

//Removes background colors from the grid cells
//Allows the user a "do-over" of their artwork without actually re-creating the grid

function clearGrid() {
	var cells = $('.grid-cell');
	for (i = 0; i < cells.length; i++) {
		var thisCell = cells[i];
		if ($(thisCell).css('background-color') != 'white') {
			$(thisCell).css('background-color','white');
		}
	}
}

//Event listener; calls the 'makeGrid' function with the 'Build grid' button is clicked
//Also adds the 'click' event listener for each cell, which includes a call to display the 'Clear grid' button
//Handles edge cases — user entered nothing, 0, or a negative number, or user entered very large numbers that might crash the browser

$('#build-button').click(function(){
	$('.grid').children().remove();
	getDimensions();
	if (gridWidth <= 0 || gridHeight <= 0 || gridWidth == null || gridHeight == null){
		$('.grid').append('<p>Invalid dimensions! Please enter two positive numbers.</p>');
	} else if (gridWidth > 150 || gridHeight > 150) {
		$('.grid').append('<p>Maximum dimensions: 150 x 150</p>');
	} else {
		makeGrid(gridWidth,gridHeight);
		$('.grid-cell').click(function(){
			getColor();
			$(this).css('background-color', color);
			$('#clear-button').css('display','inline-block');
		})
	}
});

//Event listener; calls the "clearGrid" function when the 'Clear grid' button is clicked
//Removes the 'Clear grid' button once the grid is cleared

$('#clear-button').click(function(){
	clearGrid();
	$('#clear-button').css('display','none');
})







