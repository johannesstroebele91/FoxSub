package utility_test

import (
	. "fabulous-fox/utility"
	"os"
	"testing"
)

func TestGetEnv(t *testing.T) {

	t.Run("fallback", func(t *testing.T) {
		environment := GetEnv("", "not called")

		if environment != "not called" {
			t.Errorf("Expected return 'not called' but returned %s", environment)
		}
	})
	t.Run("ENV found", func(t *testing.T) {
		os.Setenv("TEST_ENV", "test")

		environment := GetEnv("TEST_ENV", "not called")

		if environment == "not called" {
			t.Errorf("Expected return 'test' but returned %s", environment)
		}
	})

}
