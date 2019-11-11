package server

import "testing"

func TestFirstFunction(t *testing.T) {
	want := "Hello"
	if got := FirstFunction(); got != want {
		t.Errorf("FirstFunction() = %q, want %q", got, want)
	}
}
