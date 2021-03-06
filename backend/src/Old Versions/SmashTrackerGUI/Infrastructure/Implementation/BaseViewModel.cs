using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace SmashTrackerGUI.Infrastructure
{
	public class BaseViewModel : INotifyPropertyChanged
	{
		public event PropertyChangedEventHandler PropertyChanged = delegate { };
		public void RaisePropertyChanged([CallerMemberName]string propertyName = null)
		{
			PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
		}
	}
}
