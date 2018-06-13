<?php namespace HashOver;

// Copyright (C) 2017-2018 Jacob Barkdull
// This file is part of HashOver.
//
// HashOver is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// HashOver is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with HashOver.  If not, see <http://www.gnu.org/licenses/>.


// Tell browser output is JavaScript
header ('Content-Type: application/javascript');

// Do some standard HashOver setup work
require ('nocache-headers.php');
require ('standard-setup.php');

// Autoload class files
spl_autoload_register (function ($uri) {
	$uri = str_replace ('\\', '/', strtolower ($uri));
	$class_name = basename ($uri);
	$error = '"' . $class_name . '.php" file could not be included!';

	// Check if class file could be included
	if (!@include ('classes/' . $class_name . '.php')) {
		// If not, construct JavaScript code to display an error
		$js_error  = 'var hashover = document.getElementById (\'hashover\') || document.body;' . PHP_EOL;
		$js_error .= 'var error = \'<p><b>HashOver</b>: ' . $error . '</p>\';' . PHP_EOL . PHP_EOL;
		$js_error .= 'hashover.innerHTML += error;';

		// Display JavaScript code
		echo $js_error;
		exit;
	}
});
