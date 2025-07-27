CATEGORIES = ["Transport", "Food", "Shopping", "Entertainment", "Miscellaneous"]

# Simple keyword mapping for categorization
CATEGORY_KEYWORDS = {
    "Food": ["McDonald's", "KFC", "Subway", "Food Court", "Coffeeshop", "Hawker Centre", 
                    "GrabFood", "Foodpanda", "Toast Box", "Ya Kun", "Kopitiam"],
    "Transport": ["MRT/Bus", "Grab", "Taxi", "EZ-Link Top-up"],
    "Entertainment": ["Golden Village", "Shaw Cinemas", "Timezone", "Steam Games", 
                           "Netflix", "Spotify", "PlayStation Store", "Apple App Store"],
    "Shopping": ["Uniqlo", "H&M", "Popular Bookstore", "Challenger", "Courts", 
                        "Shopee", "Lazada", "7-Eleven", "Watsons", "Guardian"],
    "Savings": ["POSB", "DBS", "OCBC", "UOB"],
    "Miscellaneous": ["Singtel", "Starhub", "M1", "Circles.Life"]
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
