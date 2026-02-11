#!/bin/bash
# Kasa AI Test Runner
# Usage: ./tests/run-kasa-tests.sh [base_url]
# Example: ./tests/run-kasa-tests.sh https://haraya.vercel.app

BASE_URL="${1:-https://haraya.vercel.app}"
API_URL="$BASE_URL/api/chat"
TEST_FILE="$(dirname "$0")/kasa-test-conversations.json"
OUTPUT_DIR="$(dirname "$0")/results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULT_FILE="$OUTPUT_DIR/kasa-results-$TIMESTAMP.md"

mkdir -p "$OUTPUT_DIR"

echo "# Kasa AI Test Results" > "$RESULT_FILE"
echo "**Date:** $(date)" >> "$RESULT_FILE"
echo "**API:** $API_URL" >> "$RESULT_FILE"
echo "" >> "$RESULT_FILE"

total=0
passed=0
failed=0

# Parse and run each test
test_count=$(jq '.tests | length' "$TEST_FILE")

for i in $(seq 0 $((test_count - 1))); do
  persona_id=$(jq -r ".tests[$i].id" "$TEST_FILE")
  persona_name=$(jq -r ".tests[$i].persona" "$TEST_FILE")

  echo "---" >> "$RESULT_FILE"
  echo "## $persona_name" >> "$RESULT_FILE"
  echo "" >> "$RESULT_FILE"

  conv_count=$(jq ".tests[$i].conversations | length" "$TEST_FILE")

  for j in $(seq 0 $((conv_count - 1))); do
    conv_name=$(jq -r ".tests[$i].conversations[$j].name" "$TEST_FILE")
    messages=$(jq -c ".tests[$i].conversations[$j].messages" "$TEST_FILE")

    total=$((total + 1))
    echo -n "  Testing [$persona_id] $conv_name... "

    # Call the API
    response=$(curl -s -w "\n---HTTP_STATUS:%{http_code}---" \
      -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "{\"messages\":$messages,\"context\":{}}" \
      --max-time 30 2>&1)

    http_status=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
    body=$(echo "$response" | sed 's/---HTTP_STATUS:[0-9]*---$//')

    if [ "$http_status" = "200" ] && [ -n "$body" ]; then
      echo "OK (${#body} chars)"
      passed=$((passed + 1))
      status="PASS"
    else
      echo "FAIL (HTTP $http_status)"
      failed=$((failed + 1))
      status="FAIL"
    fi

    # Get the last user message for display
    last_user_msg=$(echo "$messages" | jq -r '[.[] | select(.role=="user")] | last | .content')

    echo "### $conv_name [$status]" >> "$RESULT_FILE"
    echo "**User:** $last_user_msg" >> "$RESULT_FILE"
    echo "" >> "$RESULT_FILE"
    echo "**Kasa:**" >> "$RESULT_FILE"
    echo "> $(echo "$body" | sed 's/$/  /' | head -20)" >> "$RESULT_FILE"
    echo "" >> "$RESULT_FILE"

    # Small delay to not hammer the API
    sleep 1
  done
done

echo "---" >> "$RESULT_FILE"
echo "## Summary" >> "$RESULT_FILE"
echo "- **Total:** $total" >> "$RESULT_FILE"
echo "- **Passed:** $passed" >> "$RESULT_FILE"
echo "- **Failed:** $failed" >> "$RESULT_FILE"

echo ""
echo "=============================="
echo "  RESULTS: $passed/$total passed"
echo "  Output: $RESULT_FILE"
echo "=============================="
