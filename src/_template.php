<?php
	require 'config.php';
	$title = '';
	include_once 'static/head.php';
?>

<body>
<?php include_once 'static/noscript.php'; ?>

	<?php include_once 'static/nav.php'; ?>


	<section class="main grid" role="main">

		<div class="text grid__item">

		</div><!-- //body -->

		<aside class="sidebar grid__item">

		</aside><!-- //sidebar -->

	</section><!-- //main -->


	<?php include_once 'static/footer.php'; ?>

<?php include_once 'static/scripts.php'; ?>

</body>
</html>
<?php ob_flush(); ?>