using Xunit;
using backend_dotnet.Models;

namespace backend_dotnet.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void NewTask_ShouldNotBeCompleted()
        {
            // Arrange
            var task = new TaskItem
            {
                Title = "Przetestować bezpiecznik"
            };

            // Assert
            Assert.False(task.IsCompleted);
        }
    }
}