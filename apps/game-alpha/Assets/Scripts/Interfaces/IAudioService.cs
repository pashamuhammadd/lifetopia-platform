namespace Lifetopia.Interfaces
{
    public interface IAudioService
    {
        void PlaySFX(string clipId, float volume = 1f);
        void PlayMusic(string clipId, bool loop = true);
        void StopMusic();
        void SetMasterVolume(float volume);
    }
}
