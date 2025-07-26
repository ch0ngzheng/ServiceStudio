CATEGORIES = ["Transport", "Meals", "Shopping", "Groceries", "Miscellaneous"]

# Simple keyword mapping for categorization
CATEGORY_KEYWORDS = {
    "Transport": ["mrt", "bus", "grab", "greb", "gojek", "comfortdelgro", "taxi"],
    "Meals": ["restaurant", "cafe", "food", "mcdo", "kfc", "subway"],
    "Shopping": ["shopee", "lazada", "amazon", "uniqlo", "zara"],
    "Groceries": ["fairprice", "cold storage", "shengsiong", "giant"],
}

def auto_categorize_transaction(transaction):
    """Categorizes a transaction based on its description and merchant."""
    description = transaction.get('description', '').lower()
    merchant = transaction.get('merchant', '').lower()
    text_to_scan = f"{description} {merchant}"

    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(keyword in text_to_scan for keyword in keywords):
            return category
    
    return "Miscellaneous"  # Default category
