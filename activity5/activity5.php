<!DOCTYPE html>

<html lang="en">
<head>
    <title>Currency Calculation</title>
    <meta name="description" content="CENG 311 Inclass Activity 5" />
</head>

<body>
    <h2>Currency Converter</h2>
    <?php
    // Define conversion rates
    $rates = [
        'USD' => 1.00,    // Base currency
        'EUR' => 0.85,    // 1 USD = 0.85 EUR
        'CAD' => 1.25     // 1 USD = 1.25 CAD
    ];

    function convertCurrency($amount, $fromCurrency, $toCurrency, $rates) {
        // First convert to USD if not already USD
        $inUSD = $fromCurrency === 'USD' ? 
                 $amount : 
                 $amount / $rates[$fromCurrency];
        
        // Then convert from USD to target currency
        return $toCurrency === 'USD' ? 
               $inUSD : 
               $inUSD * $rates[$toCurrency];
    }

    $result = '';
    if (isset($_GET['convert'])) {
        $amount = floatval($_GET['from_value']);
        $fromCurrency = substr($_GET['from_currency'], 1); 
        $toCurrency = substr($_GET['to_currency'], 1);     
        
        if ($amount > 0) {
            $converted = convertCurrency($amount, $fromCurrency, $toCurrency, $rates);
            $result = number_format($amount, 2) . " " . $fromCurrency . " = " . 
                     number_format($converted, 2) . " " . $toCurrency;
        }
    }
    ?>

    <form action="activity5.php" method="GET">
        <table>
            <tr>
                <td>From:</td>
                <td><input type="text" name="from_value" value="<?php echo isset($_GET['from_value']) ? htmlspecialchars($_GET['from_value']) : ''; ?>"/></td>
                <td>Currency:</td>
                <td>
                    <select name="from_currency">
                        <option value="FUSD">USD</option>
                        <option value="FCAD">CAD</option>
                        <option value="FEUR">EUR</option>
                    </select>
                </td>    
            </tr>
            <tr>
                <td>To:</td>
                <td><input type="text" name="to_value" readonly value="<?php echo isset($converted) ? number_format($converted, 2) : ''; ?>"/></td>
                <td>Currency:</td>
                <td>
                    <select name="to_currency">
                        <option value="TUSD">USD</option>
                        <option value="TCAD">CAD</option>
                        <option value="TEUR">EUR</option>
                    </select>
                </td>    
            </tr>
            <tr>
                <td colspan="3"></td>
                <td>
                    <input type="submit" name="convert" value="Convert"/>
                </td>    
            </tr>
        </table>
    </form>
    
    <?php if ($result): ?>
        <div class="result"><?php echo htmlspecialchars($result); ?></div>
    <?php endif; ?>


</body>
</html>