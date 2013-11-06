<?php
	ob_start();


	foreach (glob($_SERVER['DOCUMENT_ROOT'].'/includes/classes/*.class.php') as $class_filename){
    require_once($class_filename);
  }

  foreach (glob($_SERVER['DOCUMENT_ROOT'].'/includes/functions/*.php') as $func_filename){
    require_once($func_filename);
  }


	set_include_path($_SERVER['DOCUMENT_ROOT'].'/includes/');


  iconv_set_encoding('input_encoding' , 'UTF-8');
  iconv_set_encoding('output_encoding' , 'UTF-8');
  iconv_set_encoding('internal_encoding' ,'UTF-8');


  header("Content-Type: text/html; charset=utf-8");

?>