<?php
$sSqlrFilePath = $_GET["sqlrfilepath"];
$num_po = $_GET["num_po"];
$sku = $_GET["sku"];
?>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>jQuery Columns Examples</title>
        <script src="scripts/jQuery-Plugin-To-Convert-JSON-Data-Into-Data-Grid-Columns/js/jquery.min.js"></script>
        <script src="scripts/jQuery-Plugin-To-Convert-JSON-Data-Into-Data-Grid-Columns/js/jquery.columns-1.0.min.js"></script>
        <link id="style" href="scripts/jQuery-Plugin-To-Convert-JSON-Data-Into-Data-Grid-Columns/css/classic.css" rel="stylesheet" media="screen">
    </head>
    <body>
        
        dataGrid.php?sqlrfilepath=gridShipmentFollowUp.sql<br>
        dataGrid.php?sqlrfilepath=utilisateurs.sql<br>
        
        <div id="container"></div>

        <script language="javascript">
            $.ajax({
                url: 'WsGetJsonFromSql.php?apikey=595c015a-98c4-4097-9d89-c5b83ed28ff1&isonlyresult=TRUE&num_po=<?php echo $num_po ?>&sku=<?php echo $sku ?>&sqlrfilepath=<?php echo $sSqlrFilePath ?>',
                dataType: 'json',
                success: function (json) {
                    example2 = $('#container').columns({
                        data: json,
                    });
                }
            });
        </script>
    </body>
</html>
